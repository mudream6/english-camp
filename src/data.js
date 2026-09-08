// ============================================================
// 全站文案 / 数据 —— 改这一个文件即可重排整站
// ============================================================
// ⚠️ 上线前必改的示例占位内容（README「上线前替换清单」同步维护）：
//   brand 品牌名、hero 文案、contact 电话/微信/邮箱/地址、
//   各统计数字（学员数、教龄等）、课程年龄区间、教师资料（无真实照片，
//   先以字母头像占位，提供照片后填 photo 字段即可自动切换为图片）。
// ============================================================

export const brand = {
  nameZh: '诺瓦英语',
  nameEn: 'Nova English',
  tagline: '全外教英语训练营',
  mark: 'N',
}

export const nav = {
  links: [
    { id: 'about', label: '关于我们' },
    { id: 'courses', label: '课程营地' },
    { id: 'team', label: '外教团队' },
    { id: 'outcomes', label: '学员收获' },
  ],
  cta: { label: '预约试听', href: '#contact' },
}

export const hero = {
  kicker: 'Nova English Academy · 全外教 · 小班 · 沉浸式训练营',
  leadIt: 'Where conversation leads, fluency follows.',
  line1: '让每一次开口，',
  line2a: '都像母语一样',
  line2b: '自然。',
  sub: '诺瓦英语训练营没有刷题与模板——来自英、美、加、澳的持证外教，以 8 人小班与全英文课堂，陪 6–18 岁学员完成从“能听懂”到“敢开口、会表达”的跨越。',
  cta: [
    { label: '预约免费体验课', href: '#contact', primary: true },
    { label: '查看课程营地', href: '#courses' },
  ],
  trust: ['100% 持证外教', '8 人内小班', '全英文沉浸课堂', '课后 1v1 反馈'],
}

export const about = {
  no: '01',
  en: 'About',
  zh: '关于我们',
  title: '一家认真对待“开口”的英语训练营',
  p1: '诺瓦英语（Nova English Academy）创立于 2013 年，专注全外教沉浸式英语训练营。我们相信：语言不是背出来的，而是在真实的对话与任务中“用”出来的。',
  p2: '因此，我们把每一堂课都设计成一段可参与的语境——戏剧、辩论、科学实验、项目提案。孩子在这里不是为了考试而学英语，而是为了表达自己而使用英语。',
  features: [
    {
      n: '01',
      t: '全外教持证授课',
      d: '100% 母语外教，均持有 TESOL / CELTA 等国际英语教学资质，平均教龄 7 年以上。',
    },
    {
      n: '02',
      t: '8 人内小班',
      d: '每班不超过 8 人，保证高频开口与充分关注，每位学员每堂课都有大量表达机会。',
    },
    {
      n: '03',
      t: '全英文真实语境',
      d: '课堂以项目、戏剧、辩论等真实任务驱动，语言在“用”中自然习得，而非翻译中记忆。',
    },
    {
      n: '04',
      t: '家校透明反馈',
      d: '每节课后外教出具学员表现反馈，成长轨迹家长全程可见、心中有数。',
    },
  ],
  stats: [
    { v: '13', u: '年', l: '教学沉淀' },
    { v: '30', u: '+', l: '持证外教' },
    { v: '4000', u: '+', l: '累计学员' },
    { v: '1:8', u: '', l: '师生比上限' },
  ],
}

export const courses = {
  no: '02',
  en: 'Programs',
  zh: '课程营地',
  title: '训练营式课程，短周期高密度突破',
  sub: '假期营地集中浸泡，周末与 1v1 长期陪伴——总有一种节奏，适合当下的你。',
  note: '以上费用请咨询课程顾问，按班期与优惠实时核算。',
  list: [
    {
      id: 'winter-camp',
      en: 'Winter Immersion Camp',
      zh: '寒假全英沉浸营',
      tag: '假期营地',
      len: '14 天 · 每日 6 小时',
      age: '10–16 岁',
      points: [
        '全日浸泡：上午主题课，下午项目实践',
        '英语戏剧排演 + 演讲双产出',
        '结营 1v1 能力报告与下阶段规划',
      ],
    },
    {
      id: 'summer-camp',
      en: 'Summer Global Camp',
      zh: '暑假国际视野营',
      tag: '假期营地',
      len: '21 天 · 分两期开营',
      age: '12–18 岁',
      points: [
        '项目式学习：围绕全球议题完成小组提案',
        '每日演讲时刻，人人上台表达',
        '结营主题展示，家长受邀观礼',
      ],
    },
    {
      id: 'ielts-speaking',
      en: 'IELTS Speaking Sprint',
      zh: '雅思口语 · 外教冲刺营',
      tag: '应试突破',
      len: '8 周 · 每周 2 次',
      age: '14 岁以上',
      points: [
        '外教考官视角逐题精讲与示范',
        '高频真题模考 + 逐句反馈',
        '个性化语料库与话题思路定制',
      ],
    },
    {
      id: 'private-coaching',
      en: 'Private 1-to-1 Coaching',
      zh: '外教 1v1 私教课',
      tag: '定制课程',
      len: '灵活约课 · 按需排课',
      age: '全年龄段',
      points: [
        '入学测评，匹配合适外教与教材',
        '发音矫正 / 面试口语 / 学术写作按需组合',
        '学习档案持续更新，家长随时查阅',
      ],
    },
  ],
}

export const team = {
  no: '03',
  en: 'Faculty',
  zh: '外教团队',
  title: '与真正会教的人同行',
  sub: '平均教龄 7 年 +，不只是“会说英语”，更懂得如何让你开口说英语。',
  list: [
    {
      name: 'Daniel Carter',
      zh: '丹尼尔 · 卡特',
      flag: '🇬🇧',
      origin: '伦敦 · 英国',
      cert: 'CELTA · 戏剧与演讲教学',
      exp: '9 年教龄',
      bio: '前英国中学戏剧教师。课堂像一场即兴演出，擅长帮害羞的孩子找到表达的勇气。',
      tags: ['少儿启蒙', '戏剧英语', '公众演讲'],
      initials: 'DC',
    },
    {
      name: 'Sarah Mitchell',
      zh: '莎拉 · 米切尔',
      flag: '🇺🇸',
      origin: '纽约 · 美国',
      cert: 'TESOL · 自然拼读与绘本阅读',
      exp: '7 年教龄',
      bio: '前纽约公立小学教师。用绘本与歌谣带孩子建立语感，最擅长零基础的第一次开口。',
      tags: ['自然拼读', '绘本阅读', '少儿启蒙'],
      initials: 'SM',
    },
    {
      name: 'James O’Connor',
      zh: '詹姆斯 · 奥康纳',
      flag: '🇨🇦',
      origin: '多伦多 · 加拿大',
      cert: 'CELTA · 雅思口语 / 学术写作',
      exp: '10 年教龄',
      bio: '前雅思口语考官。深谙评分标准，也相信“高分的本质是真实的思考与表达”。',
      tags: ['雅思口语', '学术写作', '面试辅导'],
      initials: 'JO',
    },
    {
      name: 'Emily Baker',
      zh: '艾米丽 · 贝克',
      flag: '🇦🇺',
      origin: '墨尔本 · 澳大利亚',
      cert: 'MA 应用语言学 · 批判性阅读',
      exp: '6 年教龄',
      bio: '应用语言学硕士。带学生读原著、看世界，让思辨成为英语学习里最酷的部分。',
      tags: ['批判性阅读', '辩论', '青少年进阶'],
      initials: 'EB',
    },
  ],
}

// 能力收获 / 教学服务 双分类卡片
export const outcomes = {
  no: '04',
  en: 'Outcomes',
  zh: '学员收获',
  title: '带得走的，不只是成绩',
  sub: '我们以终为始地设计每一堂课：结营时带走的，是能力、习惯与自信。',
  list: [
    {
      icon: 'mic',
      cat: '能力收获',
      t: '开口的自信',
      d: '每节课高频真实对话，让孩子从“不敢说”到“抢着说”。',
    },
    {
      icon: 'message',
      cat: '能力收获',
      t: '地道的语音语调',
      d: '母语外教带读与逐句反馈，语感在模仿中自然形成。',
    },
    {
      icon: 'zap',
      cat: '能力收获',
      t: '用英语思考的习惯',
      d: '全英文课堂不经过“中英互译”，直接建立英语思维回路。',
    },
    {
      icon: 'book',
      cat: '能力收获',
      t: '深度阅读与观点表达',
      d: '围绕原著与议题的项目式学习，读写与表达同步进阶。',
    },
    {
      icon: 'globe',
      cat: '能力收获',
      t: '国际视野与同理心',
      d: '与不同文化背景的外教朝夕相处，理解差异、自信表达。',
    },
    {
      icon: 'target',
      cat: '能力收获',
      t: '看得见的阶段成长',
      d: '入营测评与结营报告双对比，进步清晰可感。',
    },
    {
      icon: 'file',
      cat: '教学服务',
      t: '专属学习档案',
      d: '每位学员一份成长档案，外教与顾问共同追踪长期轨迹。',
    },
    {
      icon: 'users',
      cat: '教学服务',
      t: '家校沟通闭环',
      d: '课后即时反馈 + 月度开放课 + 顾问 24h 答疑，全程透明。',
    },
  ],
}

export const contact = {
  no: '05',
  en: 'Contact',
  zh: '联系我们',
  title: '下一期营地，正在招募',
  sub: '留下联系方式，课程顾问将在 24 小时内与你联系，并安排一节免费的体验课。',
  // TODO 第三方表单接入：填入 iframe 嵌入地址后，留言区自动切换为嵌入表单；
  // 留空则使用当前纯前端方案（提交时唤起邮件客户端）。
  leadForm: {
    embedUrl: '',
    fields: {
      name: '家长 / 学员姓名',
      phone: '联系电话',
      age: '学员年龄',
      program: '意向课程',
      note: '想了解的内容（选填）',
    },
  },
  items: [
    {
      icon: 'wechat',
      label: '课程咨询微信',
      value: 'nova-english-camp',
      note: '添加好友时请备注“训练营”',
      copyable: true,
    },
    { icon: 'phone', label: '咨询电话', value: '400-820-1680', note: '周一至周日 9:00–21:00' },
    { icon: 'mail', label: '电子邮箱', value: 'hello@novaenglish.cn', note: '24 小时内回复' },
    { icon: 'pin', label: '中心地址', value: '示例市 · 示例区 · 学府路 88 号', note: '地铁 1 号线 学府路站 C 口' },
  ],
  socials: [
    { label: '微信公众号', handle: '诺瓦英语 Nova English' },
    { label: '小红书', handle: '@nova.english' },
    { label: '视频号', handle: 'Nova English' },
  ],
  copyright: '© 2026 Nova English Academy · 诺瓦英语训练营 保留所有权利',
  icp: '示例备案号：粤ICP备00000000号-0（上线前替换）',
}
