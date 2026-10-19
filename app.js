    // ===== AI助手形象（机器人 / 虚拟人 / 文字助手） =====
    const _ROBOT_AVATAR = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20friendly%20AI%20robot%20assistant%20head%20avatar%2C%20glossy%20white%20and%20blue%20robot%2C%20glowing%20digital%20eyes%2C%20e-commerce%20customer%20service%20mascot%2C%203D%20render%2C%20clean%20purple%20gradient%20background&image_size=square';
    const avatars = {
        robot: _ROBOT_AVATAR,
        virtual: 'avatars/virtual_face.jpg',
        text: _ROBOT_AVATAR
    };

    // ===== 实验条件：3（AI类型）× 3（购物场景） =====
    const conditions = [
        { id: 'robot-computer',   aiType: 'robot',   scenario: 'computer' },
        { id: 'robot-pet',        aiType: 'robot',   scenario: 'pet' },
        { id: 'robot-perfume',    aiType: 'robot',   scenario: 'perfume' },
        { id: 'virtual-computer', aiType: 'virtual', scenario: 'computer' },
        { id: 'virtual-pet',      aiType: 'virtual', scenario: 'pet' },
        { id: 'virtual-perfume',  aiType: 'virtual', scenario: 'perfume' },
        { id: 'text-computer',    aiType: 'text',    scenario: 'computer' },
        { id: 'text-pet',         aiType: 'text',    scenario: 'pet' },
        { id: 'text-perfume',     aiType: 'text',    scenario: 'perfume' },
    ];

    const aiNames = { robot: 'AI机器人助手', virtual: 'AI虚拟人助手', text: 'AI购物文字助手' };

    // ===== 购物场景配置（三阶段对话流程） =====
    const scenarios = {
        computer: {
            name: '购买笔记本电脑',
            shopName: '星辰数码官方旗舰店',
            greeting: '您好，欢迎光临星辰数码官方旗舰店！我是您的专属AI购物助手～ 看您在挑选笔记本电脑，为了帮您找到最合适的一款，想先了解一下您的使用需求哦。',
            cardsVoice: '接下来为您介绍这三款产品。第一款，星辰轻语 Air 14，主打轻薄办公，14英寸屏幕，酷睿i7处理器，16G内存、512G固态硬盘，售价5999元。第二款，星辰战神 Pro 16，主打电竞性能，16英寸屏幕，酷睿i9处理器，32G内存，搭载RTX4060独立显卡，售价8999元。第三款，星辰星曜 Air Pro，主打高端便携，14英寸2.8K OLED屏，酷睿i7处理器，1TB固态硬盘，整机仅0.99公斤，售价6999元。',
            preferences: [
                '主要办公学习，希望价格实惠',
                '主要游戏娱乐，追求高性能',
                '经常出差通勤，追求极致轻薄'
            ],
            products: [
                { name: '星辰轻语 Air 14', spec: '14英寸 | 酷睿i7 | 16G | 512G', price: '¥5999', tagline: '产品一 · 轻薄办公之选',
                  img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=slim%20silver%20laptop%20computer%20product%20photo%2C%2014%20inch%20ultrabook%2C%20clean%20white%20background%2C%20e-commerce%20product%20photography%2C%20studio%20lighting&image_size=square' },
                { name: '星辰战神 Pro 16', spec: '16英寸 | 酷睿i9 | 32G | RTX4060', price: '¥8999', tagline: '产品二 · 电竞性能怪兽',
                  img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20gaming%20laptop%20with%20RGB%20backlit%20keyboard%20product%20photo%2C%2016%20inch%2C%20clean%20white%20background%2C%20e-commerce%20product%20photography%2C%20studio%20lighting&image_size=square' },
                { name: '星辰星曜 Air Pro', spec: '14英寸2.8K OLED | 酷睿i7 | 1TB | 0.99kg', price: '¥6999', tagline: '产品三 · 高端极致便携',
                  img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20ultra%20thin%20laptop%20with%20vivid%20OLED%20screen%20product%20photo%2C%20space%20gray%2C%20clean%20white%20background%2C%20e-commerce%20product%20photography%2C%20studio%20lighting&image_size=square' }
            ],
            recommendMap: [
                { index: 0, reason: '它完全可以满足日常办公学习需求，而且活动价比同配置机型便宜近千元，是公认的性价比之王！' },
                { index: 1, reason: '它搭载RTX4060独立显卡和165Hz高刷屏，主流3A大作都能高画质流畅运行，玩游戏就选它！' },
                { index: 2, reason: '它整机仅0.99kg，和一瓶矿泉水差不多重，还有2.8K OLED好屏，通勤出差说走就走，是轻薄本里的标杆！' }
            ],
            detailQuestions: [
                { q: '这款的具体配置怎么样？', a: [
                    '这款搭载第13代酷睿i7处理器，16GB LPDDR5内存和512GB PCIe 4.0高速固态硬盘，14英寸全高清防眩光屏，日常办公、网课、轻度剪辑都非常流畅。',
                    '这款搭载第13代酷睿i9处理器，32GB内存和1TB固态硬盘，还有RTX4060独立显卡，16英寸2.5K 165Hz高刷屏，无论是3A游戏还是视频渲染都游刃有余。',
                    '这款搭载酷睿i7处理器，16GB内存和1TB大固态，屏幕是2.8K 120Hz OLED镜面屏色彩非常优秀，整机仅0.99kg，轻薄和性能兼得。' ] },
                { q: '现在购买有什么优惠吗？', a: [
                    '现在活动价直降500元，到手仅需5999元，还赠送原装电脑包和无线鼠标，支持12期免息分期，非常划算。',
                    '现在下单赠送电竞鼠标和加大鼠标垫，晒单还返100元购物卡，支持12期免息，整体优惠力度很大。',
                    '现在购买赠送多功能扩展坞一个，支持12期免息分期，还额外送半年延保服务，活动很划算。' ] },
                { q: '质量和做工有保障吗？', a: [
                    '这款采用金属机身，通过了军规级耐用性测试，出厂前经过严格质检，做工在同价位里是数一数二的。',
                    '这款采用双风扇五热管散热系统，出厂前经过72小时极限压测，品控严格，长时间游戏也稳定不降频。',
                    '这款采用CNC一体成型工艺，表面细腻有质感，整机通过多项品质认证，做工可以对标高端旗舰。' ] },
                { q: '和另外两款相比，优势在哪里？', a: [
                    '另外两款一个偏游戏性能但价格更高，一个偏高端轻薄但贵1000元。如果您主要是办公学习，这款用更低的预算就能满足需求，省钱又实用。',
                    '轻语Air和星曜Pro都是集成显卡的轻薄本，玩大型游戏会比较吃力。这款有RTX4060独显加持，性能完全不是一个量级，游戏体验直接拉满。',
                    '轻语Air胜在价格实惠，战神Pro胜在性能强但更重。这款兼顾轻薄、屏幕素质和颜值，0.99kg是三款中最轻的，出行体验最好。' ] },
                { q: '售后服务怎么样？', a: [
                    '支持全国联保两年，7天无理由退换，15天质量问题换新，全国有500多个服务网点，售后无忧。',
                    '支持全国联保两年，首年还提供上门维修服务，7天无理由退换，售后非常有保障。',
                    '支持全国联保两年，7天无理由退换，还赠送半年延保，全国联保网点可就近维修，请放心购买。' ] }
            ]
        },
        pet: {
            name: '购买宠物定位器',
            shopName: '宠物星球官方旗舰店',
            greeting: '您好，欢迎光临宠物星球官方旗舰店！我是您的专属AI购物助手～ 看您在挑选宠物定位器，为了帮您找到最合适的一款，想先了解一下您的使用需求哦。',
            cardsVoice: '接下来为您介绍这三款产品。第一款，宠物星标 Mini，主打高性价比，GPS加WiFi双模定位，7天续航，IP67防水，售价199元。第二款，宠物星标 Pro，全能均衡之选，四重融合定位，15天续航，IP68防水，还带电子围栏，售价299元。第三款，宠物星标 Ultra，旗舰安全之选，4G全网通，30天续航，支持心率监测，还有夜光项圈，售价399元。',
            preferences: [
                '预算有限，满足基本定位需求就好',
                '想要功能全面，续航也要更久',
                '追求旗舰体验，安全监控一步到位'
            ],
            products: [
                { name: '宠物星标 Mini', spec: 'GPS+WiFi定位 | 7天续航 | IP67防水', price: '¥199', tagline: '产品一 · 高性价比之选',
                  img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=small%20white%20GPS%20pet%20tracker%20tag%20product%20photo%2C%20minimal%20design%2C%20clean%20white%20background%2C%20e-commerce%20product%20photography%2C%20studio%20lighting&image_size=square' },
                { name: '宠物星标 Pro', spec: '四重定位 | 15天续航 | IP68防水 | 电子围栏', price: '¥299', tagline: '产品二 · 全能均衡之选',
                  img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20GPS%20pet%20tracker%20collar%20device%20product%20photo%2C%20modern%20design%2C%20clean%20white%20background%2C%20e-commerce%20product%20photography%2C%20studio%20lighting&image_size=square' },
                { name: '宠物星标 Ultra', spec: '4G全网通 | 30天续航 | 心率监测 | 夜光项圈', price: '¥399', tagline: '产品三 · 旗舰安全之选',
                  img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20black%20GPS%20pet%20tracker%20collar%20product%20photo%2C%20metal%20accent%2C%20luxury%20design%2C%20clean%20white%20background%2C%20e-commerce%20product%20photography%2C%20studio%20lighting&image_size=square' }
            ],
            recommendMap: [
                { index: 0, reason: '它百元出头的价格就能实现精准定位，7天续航、防水防泼溅，日常遛狗防走丢完全够用，性价比超高！' },
                { index: 1, reason: '它采用四重融合定位，精度更高，15天超长续航还带电子围栏，功能全面价格适中，是大多数养宠家庭的首选！' },
                { index: 2, reason: '它是我们的旗舰款，4G全网通随时随地查看位置，还有心率健康监测和夜光项圈，把毛孩子的安全呵护到极致！' }
            ],
            detailQuestions: [
                { q: '这款的定位精度怎么样？', a: [
                    '这款采用GPS+WiFi双模定位，室外精度在10米以内，小区、公园这些日常遛弯场景完全够用。',
                    '这款采用GPS+北斗+WiFi+基站四重融合定位，室外精度可达5米以内，室内也能定位到15米左右，更精准。',
                    '这款搭载4G全网通和双频GPS，室外精度3-5米，地下车库、商场室内也能连续追踪，定位能力最强。' ] },
                { q: '电池续航能撑多久？', a: [
                    '正常使用7天左右，省电模式最长可达12天，低电量时手机APP会自动提醒您充电。',
                    '正常使用15天，省电模式最长21天，还支持快充，充电10分钟就能用一整天。',
                    '内置大容量电池，正常使用30天，几乎一个月才充一次电，还有智能低功耗模式。' ] },
                { q: '防水防丢效果如何？', a: [
                    'IP67防水等级，雨天、宠物玩水都不怕，项圈卡扣很稳固，剧烈运动也不会脱落。',
                    'IP68防水等级，游泳洗澡都能戴，还带脱落报警功能，项圈一旦被取下手机立即收到提醒。',
                    'IP68防水加上航空级卡扣，还有夜光项圈设计，夜间也能看清宠物位置，防丢等级最高。' ] },
                { q: '和另外两款相比，优势在哪里？', a: [
                    '另外两款功能更强但价格也更高。如果您只需要基础的防走丢功能，这款用最低的成本解决问题，实惠又实用。',
                    'Mini定位精度一般，Ultra价格偏高。这款在精度、续航、功能之间取得了最佳平衡，299元买到的配置最全面。',
                    'Mini和Pro都依赖蓝牙辅助定位，超远距离追踪会受限。这款自带4G全网通，宠物跑到哪都能实时追踪，还有心率监测这个独有功能。' ] },
                { q: '有什么优惠活动吗？', a: [
                    '现在下单立减30元，到手169元，还送定制项圈带一条，性价比拉满。',
                    '活动期间购买送防丢吊牌和备用卡扣，加9.9元还能换购充电底座，很划算。',
                    '现在购买赠送一年流量卡和延保服务，晒单还返30元红包，旗舰款也有大力度优惠。' ] }
            ]
        },
        perfume: {
            name: '购买香水',
            shopName: '花漾美妆官方旗舰店',
            greeting: '您好，欢迎光临花漾美妆官方旗舰店！我是您的专属AI购物助手～ 看您在挑选香水，为了帮您找到最合适的一款，想先了解一下您的使用偏好哦。',
            cardsVoice: '接下来为您介绍这三款产品。第一款，花漾时光淡香水，清新日常之选，50毫升装，柑橘茉莉香调，清新花香，售价329元。第二款，花漾魅影浓香水，优雅气质之选，50毫升装，玫瑰琥珀香调，优雅持久，售价459元。第三款，花漾蜜语果香香水，甜美可爱之选，30毫升装，甜蜜果香调，少女甜香，售价259元。',
            preferences: [
                '日常通勤使用，喜欢清新淡雅的香味',
                '重要场合使用，喜欢优雅持久的香味',
                '自用送礼都合适，喜欢甜美可爱的风格'
            ],
            products: [
                { name: '花漾时光 淡香水', spec: '50ml | 柑橘茉莉 | 清新花香调', price: '¥329', tagline: '产品一 · 清新日常之选',
                  img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=light%20pink%20glass%20perfume%20bottle%20product%20photo%2C%20fresh%20floral%20scent%2C%20clean%20white%20background%2C%20e-commerce%20product%20photography%2C%20studio%20lighting&image_size=square' },
                { name: '花漾魅影 浓香水', spec: '50ml | 玫瑰琥珀 | 优雅持久', price: '¥459', tagline: '产品二 · 优雅气质之选',
                  img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=deep%20red%20elegant%20glass%20perfume%20bottle%20product%20photo%2C%20luxury%20perfume%2C%20clean%20white%20background%2C%20e-commerce%20product%20photography%2C%20studio%20lighting&image_size=square' },
                { name: '花漾蜜语 果香香水', spec: '30ml | 甜蜜果香 | 少女甜香', price: '¥259', tagline: '产品三 · 甜美可爱之选',
                  img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20round%20pink%20perfume%20bottle%20product%20photo%2C%20sweet%20fruity%20scent%2C%20clean%20white%20background%2C%20e-commerce%20product%20photography%2C%20studio%20lighting&image_size=square' }
            ],
            recommendMap: [
                { index: 0, reason: '它前调是清爽柑橘、中调是茉莉花香，清新不腻，办公室喷也不突兀，留香4-6小时刚刚好，是日常通勤的完美选择！' },
                { index: 1, reason: '它是优雅的玫瑰琥珀调，留香可达8小时以上，出席晚宴、约会时若有似无的香气特别有气质，强烈推荐！' },
                { index: 2, reason: '它是甜甜的果香，瓶身圆润可爱，自己用心情愉悦，送闺蜜送同学也特别拿得出手，性价比超高！' }
            ],
            detailQuestions: [
                { q: '这款的香味层次是怎样的？', a: [
                    '前调是柑橘和佛手柑的清爽感，中调过渡到茉莉和玫瑰的花香，后调是温暖的麝香，整体清新优雅，层次分明。',
                    '前调是黑加仑的微甜，中调是大马士革玫瑰的浓郁花香，后调是琥珀和檀香的温暖气息，香感浓郁有质感。',
                    '前调是蜜桃和甜橙的果香，中调是苹果花和铃兰，后调是香草和白麝香，像刚咬一口的水果糖，甜而不腻。' ] },
                { q: '留香时间有多长？', a: [
                    '作为淡香水，留香约4-6小时，喷在衣物上可以更持久，满足一整天的通勤需求。',
                    '这款浓香水浓度更高，留香可达8-10小时，早上喷出门，晚上还有淡淡的余香。',
                    '留香约3-5小时，清新甜美的香味建议随身补喷，30ml的容量放包里正合适。' ] },
                { q: '适合什么场合和季节？', a: [
                    '四季皆宜，尤其春夏使用清爽舒适，上班、上学、日常出行都很合适。',
                    '秋冬季节使用氛围感最佳，特别适合晚宴、约会、正式场合，气质拉满。',
                    '春夏使用元气满满，日常逛街、约会、校园场景都很搭，甜美风格必备。' ] },
                { q: '和另外两款相比，优势在哪里？', a: [
                    '魅影更浓郁偏正式，蜜语更甜美偏少女。这款香调百搭不出错，日常使用频率最高，是三款里最实用的。',
                    '时光清新但留香短，蜜语甜美但偏休闲。这款浓香留香最久、最有高级感，重要场合它是最撑场面的。',
                    '时光和魅影都是经典花香调，风格偏成熟。这款果香更年轻活泼，价格也最亲民，学生党和送礼首选。' ] },
                { q: '有什么优惠活动吗？', a: [
                    '现在下单享8折优惠，到手263元，还赠送同款香体乳小样，套装更划算。',
                    '活动期购买赠精美礼盒包装和香水小样两支，满400还减40，送礼自用都体面。',
                    '现在两支立减60元，平均一支229元，还送可爱挂链瓶套，和朋友拼单超划算。' ] }
            ]
        }
    };

    // ===== 实验状态 =====
    let currentCondition = null;
    let currentScenario = null;
    let currentPhase = 'preference';   // preference -> recommending -> detail -> rating
    let selectedPreference = null;     // { index, text }
    let recommendedProductIndex = null;
    let askedQuestions = [];
    let startTime = null;
    let sessionId = null;
    let isTyping = false;
    let voiceDisabled = false;  // AI购物文字助手（text类型）强制静音

    // ===== 开始实验：随机分配 =====
    function startExperiment() {
        // 固定条件入口（9个独立网址）优先；否则随机分配
        let condIndex = Math.floor(Math.random() * conditions.length);
        if (window.FORCED_CONDITION) {
            const forcedIndex = conditions.findIndex(c => c.id === window.FORCED_CONDITION);
            if (forcedIndex >= 0) condIndex = forcedIndex;
        }
        currentCondition = conditions[condIndex];
        currentScenario = scenarios[currentCondition.scenario];
        voiceDisabled = (currentCondition.aiType === 'text');
        currentPhase = 'preference';
        selectedPreference = null;
        recommendedProductIndex = null;
        askedQuestions = [];
        // 文字助手类型不要 person-panel 布局
        document.getElementById('chatPage').classList.toggle('virtual-mode', currentCondition.aiType === 'virtual');
        startTime = new Date();
        // 自动生成匿名会话编号，用于后台区分每位被试
        sessionId = 'S' + Date.now().toString(36).toUpperCase()
            + Math.random().toString(36).slice(2, 6).toUpperCase();

        document.getElementById('landingPage').classList.remove('active');
        document.getElementById('chatPage').classList.add('active');

        document.getElementById('shopName').textContent = currentScenario.shopName + ' — ' + aiNames[currentCondition.aiType];

        // 虚拟人条件：界面最左侧展示放大的真人半身形象（三个虚拟人网址共享同一实现，效果/大小/位置一致）
        document.getElementById('chatPage').classList.toggle('virtual-mode', currentCondition.aiType === 'virtual');

        // 阶段1：显示消费偏好选项
        renderPreferenceChips();

        // 开场：AI打招呼
        setTimeout(() => addAiMessage(currentScenario.greeting, true, null, currentCondition.scenario + '_greeting'), 400);
    }

    // ===== 选项渲染 =====
    function renderPreferenceChips() {
        const tip = document.getElementById('footerTip');
        tip.innerHTML = '为了给您精准推荐，请先选择您的消费偏好：';
        const chips = document.getElementById('questionChips');
        chips.innerHTML = '';
        currentScenario.preferences.forEach((text, index) => {
            const btn = document.createElement('button');
            btn.className = 'chip pref-chip';
            btn.textContent = text;
            btn.onclick = () => selectPreference(index);
            chips.appendChild(btn);
        });
    }

    function renderDetailChips() {
        const p = currentScenario.products[recommendedProductIndex];
        const tip = document.getElementById('footerTip');
        tip.innerHTML = '您可以针对推荐的产品 <strong>【' + p.name + '】</strong> 进行细致提问（可不全部问完）：';
        const chips = document.getElementById('questionChips');
        chips.innerHTML = '';
        currentScenario.detailQuestions.forEach((item, index) => {
            const btn = document.createElement('button');
            btn.className = 'chip';
            btn.textContent = item.q;
            btn.onclick = () => askDetailQuestion(index, btn);
            chips.appendChild(btn);
        });
        // 结束提问 → 进入评分环节
        const finishBtn = document.createElement('button');
        finishBtn.className = 'chip finish-chip';
        finishBtn.textContent = '我想问完了，请评价AI助手 →';
        finishBtn.onclick = () => showRatingPanel();
        chips.appendChild(finishBtn);
    }

    // ===== 评分环节 =====
    function showRatingPanel() {
        if (currentPhase !== 'detail') return;
        if (isTyping) return;
        currentPhase = 'rating';

        // 禁用提问按钮，显示评分面板
        document.querySelectorAll('#questionChips .chip').forEach(c => c.classList.add('asked'));

        // AI说一句引导评分的话
        addAiMessage('好哒，感谢您的提问！请为我的表现打分哦，满分是5分哦~', true, () => {
            const tip = document.getElementById('footerTip');
            tip.innerHTML = '<strong style="color:#5b6ef5">请为AI购物助手打分（0-5分）：</strong>';
            const chips = document.getElementById('questionChips');
            chips.innerHTML = '';
            // 6个评分按钮
            const labels = ['0 很差', '1 较差', '2 一般', '3 还不错', '4 很好', '5 非常棒'];
            labels.forEach((label, i) => {
                const btn = document.createElement('button');
                btn.className = 'chip rating-chip rating-' + i;
                btn.textContent = label;
                btn.onclick = () => selectRating(i, btn);
                chips.appendChild(btn);
            });
        }, currentCondition.scenario + '_rating');
    }

    function selectRating(score, btnEl) {
        // 选中效果
        document.querySelectorAll('#questionChips .rating-chip').forEach(c => c.classList.remove('rating-selected'));
        btnEl.classList.add('rating-selected');
        // 用一点延迟让用户看到选中效果
        setTimeout(() => finishExperiment(score), 350);
    }

    // ===== 阶段1：选择消费偏好 =====
    function selectPreference(index) {
        if (currentPhase !== 'preference' || isTyping) return;
        // 立即锁定选项，防止重复点击
        currentPhase = 'recommending';
        document.querySelectorAll('.chip').forEach(c => c.classList.add('asked'));

        selectedPreference = { index: index, text: currentScenario.preferences[index] };
        addUserMessage(selectedPreference.text);

        const rec = currentScenario.recommendMap[index];
        recommendedProductIndex = rec.index;
        const p = currentScenario.products[rec.index];

        // AI回复1：确认偏好 + 引出推荐
        const ackText = '好的，了解到您' + selectedPreference.text + '。结合您的需求，我从店内为您精心挑选了3款产品，请您过目：';
        addAiMessage(ackText, true, () => {
            // AI展示3款产品卡片
            setTimeout(() => {
                addProductCardsMessage(() => {
                    // AI回复2：强烈推荐其中一款
                    setTimeout(() => {
                        const recText = '综合对比下来，这三款中我最推荐【' + p.name + '】（' + p.price + '）！' + rec.reason + '趁现在活动价入手非常划算，强烈推荐哦～';
                        addRecommendMessage(recText, () => {
                            // 阶段3：切换为针对推荐产品的细致提问选项
                            currentPhase = 'detail';
                            renderDetailChips();
                        }, currentCondition.scenario + '_rec' + index);
                    }, 600);
                }, currentCondition.scenario + '_cards');
            }, 400);
        }, currentCondition.scenario + '_ack' + index);
    }

    // ===== 阶段3：对推荐产品细致提问 =====
    function askDetailQuestion(index, chipEl) {
        if (currentPhase !== 'detail') return;
        if (chipEl.classList.contains('asked') || isTyping) return;
        chipEl.classList.add('asked');

        const item = currentScenario.detailQuestions[index];
        const answer = item.a[recommendedProductIndex];
        askedQuestions.push({
            question: item.q,
            answer: answer,
            timestamp: new Date().toISOString()
        });

        addUserMessage(item.q);
        addAiMessage(answer, true, null, currentCondition.scenario + '_q' + index + '_p' + recommendedProductIndex);
    }

    // ===== 消息渲染 =====
    function scrollToBottom() {
        const body = document.getElementById('chatBody');
        body.scrollTop = body.scrollHeight;
    }

    function addUserMessage(text) {
        const row = document.createElement('div');
        row.className = 'msg-row user-row';
        row.innerHTML = `
            <div class="msg-col">
                <div class="msg-name">我</div>
                <div class="bubble user-bubble">${text}</div>
            </div>`;
        document.getElementById('chatBody').appendChild(row);
        scrollToBottom();
    }

    function addAiMessage(text, withVoice, onDone, audioKey) {
        const row = document.createElement('div');
        row.className = 'msg-row';
        row.innerHTML = `
            <img class="msg-avatar" src="${avatars[currentCondition.aiType]}" alt="AI助手">
            <div class="msg-col">
                <div class="msg-name">${aiNames[currentCondition.aiType]}</div>
                <div class="bubble ai-bubble"><span class="typing-dots"><span></span><span></span><span></span></span></div>
            </div>`;
        document.getElementById('chatBody').appendChild(row);
        scrollToBottom();

        const bubble = row.querySelector('.ai-bubble');
        const delay = 700 + Math.random() * 500;
        setTimeout(() => {
            typeText(bubble, text, () => {
                if (withVoice) {
                    speakFor(text, audioKey, function() { if (onDone) onDone(); });
                } else if (onDone) {
                    onDone();
                }
            });
        }, delay);
    }

    // 强烈推荐消息（带醒目样式）
    function addRecommendMessage(text, onDone, audioKey) {
        const row = document.createElement('div');
        row.className = 'msg-row';
        row.innerHTML = `
            <img class="msg-avatar" src="${avatars[currentCondition.aiType]}" alt="AI助手">
            <div class="msg-col">
                <div class="msg-name">${aiNames[currentCondition.aiType]}</div>
                <div class="bubble ai-bubble recommend">
                    <span class="recommend-badge">🔥 强烈推荐</span>
                    <div class="recommend-text"><span class="typing-dots"><span></span><span></span><span></span></span></div>
                </div>
            </div>`;
        document.getElementById('chatBody').appendChild(row);
        scrollToBottom();

        const textEl = row.querySelector('.recommend-text');
        const delay = 600 + Math.random() * 400;
        setTimeout(() => {
            typeText(textEl, text, () => {
                speakFor(text, audioKey, function() { if (onDone) onDone(); });
            });
        }, delay);
    }

    // 展示三款产品卡片
    function addProductCardsMessage(onDone, audioKey) {
        const row = document.createElement('div');
        row.className = 'msg-row';
        let cardsHtml = '';
        currentScenario.products.forEach((p, i) => {
            const isRec = i === recommendedProductIndex;
            cardsHtml += `
                <div class="product-card${isRec ? ' recommended' : ''}">
                    <img src="${p.img}" alt="${p.name}">
                    <div class="p-info">
                        <span class="p-tag">${p.tagline}</span>
                        <span class="p-name">${p.name}${isRec ? ' <span class="p-star">★ 最推荐</span>' : ''}</span>
                        <span class="p-spec">${p.spec}</span>
                        <span class="p-price">${p.price}</span>
                    </div>
                </div>`;
        });
        row.innerHTML = `
            <img class="msg-avatar" src="${avatars[currentCondition.aiType]}" alt="AI助手">
            <div class="msg-col">
                <div class="msg-name">${aiNames[currentCondition.aiType]}</div>
                <div class="bubble ai-bubble">${cardsHtml}</div>
            </div>`;
        document.getElementById('chatBody').appendChild(row);
        scrollToBottom();
        // 产品卡片同样需要语音播报：朗读三款产品的名称、规格与价格
        speakFor(currentScenario.cardsVoice, audioKey, function() { if (onDone) onDone(); });
    }

    // ===== 打字机效果（基于时间戳；页面不可见时自动快进，避免后台定时器节流卡住流程） =====
    function typeText(el, text, done) {
        isTyping = true;
        el.textContent = '';
        const speed = 30; // 每字毫秒数
        const start = performance.now();
        function render() {
            // 页面不可见（后台标签页/切走窗口）时直接显示全部文本，保证对话流程不被阻塞
            if (document.hidden) {
                el.textContent = text;
                scrollToBottom();
                isTyping = false;
                if (done) done();
                return;
            }
            const n = Math.min(text.length, Math.floor((performance.now() - start) / speed));
            el.textContent = text.slice(0, n);
            scrollToBottom();
            if (n >= text.length) {
                isTyping = false;
                if (done) done();
                return;
            }
            setTimeout(render, 16);
        }
        render();
    }

    // ===== 语音播报 =====
    // 机器人与虚拟人共用同一套预生成语音文件（audio/ 目录），两者音色完全一致
    let currentAudio = null;
    let pendingSpeechEnd = null;   // 当前这段语音播完后要执行的回调

    // 播报文本。onEnd 在「语音真正播完」之后才调用，
    // 这样后续对话可以等上一段播完再推进，避免语音被下一段截断。
    function speakFor(text, audioKey, onEnd) {
        const finish = onEnd || function() {};
        if (voiceDisabled) { finish(); return; }

        if (!audioKey) { speak(text, finish); return; }

        stopAudio();
        const audio = new Audio('audio/' + audioKey + '.mp3');
        currentAudio = audio;

        let settled = false;
        let guard = null;
        const done = function() {
            if (settled) return;
            settled = true;
            if (guard) clearTimeout(guard);
            pendingSpeechEnd = null;
            finish();
        };
        // 兜底：即使音频事件异常，也要放行，避免对话流程卡死
        guard = setTimeout(done, 120000);
        audio.addEventListener('loadedmetadata', function() {
            if (guard) clearTimeout(guard);
            const dur = isFinite(audio.duration) ? audio.duration : 30;
            guard = setTimeout(done, dur * 1000 + 3000);
        });
        audio.onended = done;
        audio.onerror = function() {
            if (settled) return;
            settled = true;
            if (guard) clearTimeout(guard);
            pendingSpeechEnd = null;
            console.log('音频加载失败，改用语音合成：', audioKey);
            speak(text, finish);
        };
        pendingSpeechEnd = done;
        audio.play().catch(function(e) {
            console.log('音频播放被拒绝，改用语音合成：', e);
            audio.onerror();
        });
    }

    function stopAudio() {
        if ('speechSynthesis' in window) speechSynthesis.cancel();
        if (currentAudio) {
            currentAudio.onended = null;
            currentAudio.onerror = null;
            currentAudio.pause();
            currentAudio = null;
        }
        // 这段语音若被中途打断，也要放行等待中的后续流程，避免卡死
        if (pendingSpeechEnd) {
            const cb = pendingSpeechEnd;
            pendingSpeechEnd = null;
            cb();
        }
    }

    // 音频文件加载失败时的兜底朗读（自然音色，与虚拟人语音保持一致）
    function speak(text, onEnd) {
        const finish = onEnd || function() {};
        if (voiceDisabled || !('speechSynthesis' in window)) { finish(); return; }
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'zh-CN';
        u.pitch = 1.0;
        u.rate = 1.0;
        const voices = speechSynthesis.getVoices();
        const zhVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('zh'));
        if (zhVoice) u.voice = zhVoice;
        let settled = false;
        const guard = setTimeout(function() {
            if (settled) return;
            settled = true;
            finish();
        }, Math.max(5000, text.length * 300));
        u.onend = function() {
            if (settled) return;
            settled = true;
            clearTimeout(guard);
            finish();
        };
        u.onerror = u.onend;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
    }

    // ===== 完成实验（被试打分后触发） =====
    function finishExperiment(rating) {
        stopAudio();

        const endTime = new Date();
        const duration = Math.round((endTime - startTime) / 1000);
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        document.getElementById('chatPage').classList.remove('active');
        document.getElementById('endPage').classList.add('active');

        const recName = recommendedProductIndex !== null ? currentScenario.products[recommendedProductIndex].name : '（未到达推荐环节）';
        const sessionInfo = document.getElementById('sessionInfo');
        sessionInfo.innerHTML = `
            <strong>分配场景：</strong> ${currentScenario.name}<br>
            <strong>AI助手类型：</strong> ${aiNames[currentCondition.aiType]}<br>
            <strong>消费偏好选择：</strong> ${selectedPreference ? selectedPreference.text : '（未选择）'}<br>
            <strong>AI强烈推荐产品：</strong> ${recName}<br>
            <strong>细致提问数量：</strong> ${askedQuestions.length} / ${currentScenario.detailQuestions.length}<br>
            <strong>您为AI购物助手的评分：</strong> <span style="color:#e5484d;font-weight:700;font-size:1.2em">${rating} 分</span>（0-5分）<br>
            <strong>用时：</strong> ${minutes}分${seconds}秒<br>
            <strong>提问记录：</strong><br>
            ${askedQuestions.length ? askedQuestions.map((item, i) => `Q${i + 1}: ${item.question}`).join('<br>') : '（未提问）'}
        `;

        // 上报本次实验数据到后台（失败不影响被试继续操作）
        submitRecord({
            session_id: sessionId,
            condition_id: currentCondition.id,
            scenario_name: currentScenario.name,
            ai_type: aiNames[currentCondition.aiType],
            preference_index: selectedPreference ? selectedPreference.index : null,
            preference_text: selectedPreference ? selectedPreference.text : null,
            recommended_product: recommendedProductIndex !== null
                ? currentScenario.products[recommendedProductIndex].name : null,
            detail_question_count: askedQuestions.length,
            detail_question_total: currentScenario.detailQuestions.length,
            duration_seconds: duration,
            rating: rating,
            questions: askedQuestions
        });
    }

    // ===== 数据上报 =====
    // 同源部署时 API_BASE 为空即可；若前后端分离部署，可用 window.API_BASE 指定后端地址
    function submitRecord(payload) {
        const base = window.API_BASE || '';
        fetch(base + '/api/records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(function(res) {
            if (!res.ok) console.log('实验数据上报失败，状态码:', res.status);
        }).catch(function(err) {
            console.log('实验数据上报失败:', err);
        });
    }
