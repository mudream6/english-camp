# 诺瓦英语 Nova English — 企业宣传官网

外教英语训练营机构官网 · 纯前端 SPA（无后端、无数据库）。
React 19 + Vite 7 + TailwindCSS v4，风格参考海外现代商务网站：简约克制、低饱和配色（暖纸白 + 松石绿 + 墨黑），版心 1560px（1440–1700 区间内），动画仅 transform / opacity（GPU 合成层），无粒子 / 3D / 视差，移动端与 PC 端同源流畅。

## 快速开始

```bash
npm install        # 安装依赖（npm 11 若提示脚本拦截，先执行 npm install-scripts approve esbuild）
npm run dev        # 本地开发 → http://localhost:5173
npm run build      # 产物输出到 dist/（相对路径 base:'./'，可部署到任意子路径）
npm run preview    # 本地预览构建产物
```

## 目录结构

```
├── index.html                # 入口 HTML（标题 / SEO meta / favicon）
├── vite.config.js            # base:'./' + Tailwind v4 插件
├── public/favicon.svg
└── src/
    ├── main.jsx              # 入口（引入字体 + 全局样式）
    ├── App.jsx               # 页面骨架：Nav + 各区块 + Footer
    ├── data.js               # ★ 全站文案/数据，改这一个文件即可重排整站
    ├── styles.css            # ★ 设计系统：色彩 token / 按钮 / 动效 / 表单样式
    └── components/           # Nav / Hero / About / Courses / Team / Outcomes / Footer / Reveal
```

## 页面区块与对应文件

| 区块 | 锚点 | 组件 | 数据 |
|---|---|---|---|
| 全屏 Hero（大标题 + slogan + CTA + 信任点） | #top | `Hero.jsx` | `hero` |
| 机构介绍（简介 / 优势 / 数据带） | #about | `About.jsx` | `about` |
| 课程训练营（大卡片 x4） | #courses | `Courses.jsx` | `courses` |
| 外教团队（卡片 x4） | #team | `Team.jsx` | `team` |
| 学员收获 / 教学服务（8 卡片） | #outcomes | `Outcomes.jsx` | `outcomes` |
| 全屏收束页（联系方式 / 预约表单 / 版权） | #contact | `Footer.jsx` | `contact` |

## 上线前替换清单（均为示例占位数据）

打开 `src/data.js` 逐项替换：

| 内容 | 位置 | 当前示例值 |
|---|---|---|
| 品牌名 / slogan | `brand` | 诺瓦英语 Nova English |
| 正文文案与宣传语 | `hero` `about` | 示例措辞 |
| 机构背景（成立年份、外教数、学员数、师生比） | `about.stats` | 2013 年 / 30+ / 4000+ / 1:8 |
| 课程名称、班期、适龄段、卖点 | `courses.list` | 示例课程 |
| 外教姓名、履历、简介 | `team.list` | 虚构资料 |
| 咨询电话 / 邮箱 / 微信 / 地址 | `contact.items` | 400-820-1680 等 |
| 社交媒体账号 | `contact.socials` | 示例账号 |
| 版权年份与备案号 | `contact` | © 2026 / 示例备案号 |

### 外教照片（重要）

当前外教卡片为**字母头像占位**（低饱和渐变色块 + 姓名首字母），用于保证版式完整。
拿到真实照片后，在每个外教条目加一个字段即可自动切换为图片：

```js
{ ..., initials: 'DC', photo: '/teachers/daniel.jpg' }
```

照片建议 1:1、≥400px。文件放 `public/teachers/` 下，路径以 `/` 开头。

### 留言表单接入第三方表单

预约表单当前为**纯前端方案**：提交时组装邮件并唤起访客邮件客户端（无后端也能工作）。
需要接入第三方表单（问卷星 / 金数据 / Google Form / Tally 等）时，在
`data.js → contact.leadForm.embedUrl` 填入 iframe 嵌入地址即可，整个表单会自动替换为嵌入表单：

```js
leadForm: { embedUrl: 'https://jinshuju.net/f/xxxxx/embedded' }
```

> 也可直接替换为可用的第三方表单链接：问卷星 `https://www.wjx.cn/vm/xxxxx.aspx`、腾讯问卷等，按你选择的平台生成嵌入代码。

## 部署

纯静态站点，`dist/` 任意静态托管均可：

- **Vercel / Netlify**：Framework 选 Vite（或直接拖拽 `dist/` 进 Netlify Drop）；Build `npm run build`，Output `dist`
- **Nginx**：`dist/` 拷入站点根目录即可（`base:'./'`，无需改任何路径配置）
- **GitHub Pages**：`npm run build` 后把 `dist/` 内容推到 `gh-pages` 分支
- **本地**：双击 `dist/index.html` 即可离线预览（无远程字体依赖，字体已本地打包）

## 设计与迭代

- **换肤**：改 `styles.css` 顶部 `@theme` 里的语义色 token（`--color-paper/pine/ink/...`），全局一处生效
- **字体**：正文与拉丁字形 = Manrope Variable（`@fontsource` 本地打包，无外网依赖）；斜体点缀 = Georgia 衬线；中文回退系统黑体
- **动效**：入场为 CSS `riseIn`；滚动显现由 `Reveal.jsx`（IntersectionObserver）控制，仅变换 opacity/transform；系统开启「减弱动态效果」时自动关闭
- **迭代流程**：提供参考截图 → 在预览中对照调样式/文案 → 截图+红圈标注微调位置（如「整体下移 xx」）→ 保持 `git` 快照可随时回退

## 已支持 / 未支持

✅ 双端响应式（断点 ~640 / 768 / 1024 / 1280）· 版心 1560px · 锚点平滑滚动 · 移动端全屏菜单 · 表单（mailto / 可换第三方嵌入）· 复制微信号 · SEO 基础 meta · 无远程资源可离线运行

❌ 无后端 / 无数据统计（接入第三方表单后可配）· 外教照片为占位（见上）· 文案均为示例
