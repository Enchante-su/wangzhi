# -*- coding: utf-8 -*-
"""网购情景模拟实验 —— 后端服务

功能：
  1) 提供网页静态文件（和原来的 python -m http.server 一样）
  2) 提供实验数据收集接口  POST /api/records
  3) 提供管理后台数据接口  GET /api/records （需管理密码）
  4) 数据持久化到 SQLite，重启不丢失

运行：
    python server.py
访问：
    被试端   http://<主机>:<端口>/robot_computer.html 等
    管理后台 http://<主机>:<端口>/admin.html

环境变量（公网部署时建议设置）：
    PORT             端口，默认 8080；多数云平台会自动注入该变量
    ADMIN_PASSWORD   管理后台密码，默认 admin123
    DB_PATH          SQLite 文件路径，默认 <本目录>/data/records.db
"""
import json
import os
import sqlite3
import sys
import uuid
from contextlib import contextmanager
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.environ.get("DB_PATH") or os.path.join(ROOT, "data", "records.db")
PORT = int(os.environ.get("PORT", "8080"))
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")

# 数据表字段（顺序即建表顺序与读写顺序）
COLS = [
    "id", "created_at", "session_id", "condition_id", "scenario_name", "ai_type",
    "preference_index", "preference_text", "recommended_product",
    "detail_question_count", "detail_question_total", "duration_seconds",
    "questions", "user_agent", "rating",
]

SCHEMA = """
CREATE TABLE IF NOT EXISTS records (
    id                    TEXT PRIMARY KEY,
    created_at            TEXT NOT NULL,
    session_id            TEXT,
    condition_id          TEXT,
    scenario_name         TEXT,
    ai_type               TEXT,
    preference_index      INTEGER,
    preference_text       TEXT,
    recommended_product   TEXT,
    detail_question_count INTEGER,
    detail_question_total INTEGER,
    duration_seconds      INTEGER,
    questions             TEXT,
    user_agent            TEXT,
    rating                INTEGER
)
"""


@contextmanager
def db():
    """每次请求独立连接，保证多线程下的安全，用完即关。"""
    conn = sqlite3.connect(DB_PATH, timeout=15)
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    with db() as conn:
        conn.execute(SCHEMA)
        # 旧库升级：补齐 rating 列（如果已存在则忽略）
        try:
            conn.execute("ALTER TABLE records ADD COLUMN rating INTEGER")
        except Exception:
            pass


def to_int(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    # ---------- 通用工具 ----------
    def send_json(self, obj, status=200):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Admin-Password")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.end_headers()
        self.wfile.write(body)

    def is_authed(self):
        if not ADMIN_PASSWORD:
            return True
        return self.headers.get("X-Admin-Password", "") == ADMIN_PASSWORD

    def read_body(self):
        length = to_int(self.headers.get("Content-Length"), 0)
        if length <= 0:
            return {}
        return json.loads(self.rfile.read(length).decode("utf-8"))

    # ---------- 路由 ----------
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Admin-Password")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path

        if path == "/api/records":
            if not self.is_authed():
                return self.send_json({"ok": False, "error": "管理密码错误"}, 401)
            with db() as conn:
                rows = conn.execute(
                    "SELECT {} FROM records ORDER BY created_at DESC".format(", ".join(COLS))
                ).fetchall()
            records = []
            for row in rows:
                item = dict(zip(COLS, row))
                try:
                    item["questions"] = json.loads(item.get("questions") or "[]")
                except ValueError:
                    item["questions"] = []
                records.append(item)
            return self.send_json({"ok": True, "count": len(records), "records": records})

        # 数据库文件禁止通过网页下载
        if path.startswith("/data"):
            return self.send_json({"ok": False, "error": "禁止访问"}, 403)

        if path in ("/admin", "/admin/"):
            self.path = "/admin.html"
        return super().do_GET()

    def do_POST(self):
        if urlparse(self.path).path != "/api/records":
            return self.send_json({"ok": False, "error": "接口不存在"}, 404)
        try:
            data = self.read_body()
        except ValueError:
            return self.send_json({"ok": False, "error": "数据格式错误"}, 400)

        values = (
            uuid.uuid4().hex[:12],
            datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds"),
            str(data.get("session_id") or "")[:64],
            str(data.get("condition_id") or "")[:64],
            str(data.get("scenario_name") or "")[:128],
            str(data.get("ai_type") or "")[:32],
            data.get("preference_index") if isinstance(data.get("preference_index"), int) else None,
            str(data.get("preference_text") or "")[:256],
            str(data.get("recommended_product") or "")[:128],
            to_int(data.get("detail_question_count")),
            to_int(data.get("detail_question_total")),
            to_int(data.get("duration_seconds")),
            json.dumps(data.get("questions") or [], ensure_ascii=False),
            str(self.headers.get("User-Agent") or "")[:300],
            data.get("rating") if isinstance(data.get("rating"), int) else None,
        )
        placeholders = ", ".join(["?"] * len(COLS))
        with db() as conn:
            conn.execute(
                "INSERT INTO records ({}) VALUES ({})".format(", ".join(COLS), placeholders),
                values,
            )
        return self.send_json({"ok": True, "id": values[0]}, 201)

    def do_DELETE(self):
        if not self.is_authed():
            return self.send_json({"ok": False, "error": "管理密码错误"}, 401)
        path = urlparse(self.path).path

        if path == "/api/records":                     # 清空全部
            with db() as conn:
                conn.execute("DELETE FROM records")
            return self.send_json({"ok": True})

        if path.startswith("/api/records/"):           # 删除单条
            record_id = path.rsplit("/", 1)[-1]
            with db() as conn:
                conn.execute("DELETE FROM records WHERE id = ?", (record_id,))
            return self.send_json({"ok": True})

        return self.send_json({"ok": False, "error": "接口不存在"}, 404)


def main():
    init_db()
    if ADMIN_PASSWORD == "admin123":
        print("提示：当前使用默认管理密码 admin123，公网部署请设置环境变量 ADMIN_PASSWORD", file=sys.stderr)
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print("服务已启动  http://localhost:{}/    管理后台 /admin.html    数据文件 {}".format(PORT, DB_PATH))
    server.serve_forever()


if __name__ == "__main__":
    main()
