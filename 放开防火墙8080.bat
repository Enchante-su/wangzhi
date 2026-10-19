@echo off
netsh advfirewall firewall add rule name="wangzhi-8080" dir=in action=allow protocol=TCP localport=8080
echo.
if %ERRORLEVEL% EQU 0 (
    echo ✅ 防火墙规则已添加！8080端口已开放。
) else (
    echo ❌ 执行失败，请确认是否以管理员身份运行。
)
echo.
pause
