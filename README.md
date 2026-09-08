# TIFSC 海南英语村 — 企业宣传官网

外教英语训练营机构官网（企业宣传用途）· 纯前端 SPA（无后端、无数据库）。
React 19 + Vite 7 + TailwindCSS v4。风格参考海外现代商务网站：简约克制、低饱和配色（暖纸白 + 松石绿 + 墨黑），版心 1560px（1440–1700 区间内），动画仅 transform / opacity（GPU 合成层），无粒子 / 3D / 视差。

## 快速开始

```bash
npm install        # 安装依赖（npm 11 若提示脚本拦截，先执行 npm install-scripts approve esbuild）
npm run dev        # 本地开发 → http://localhost:5173
npm run build      # 单文件构建 → dist/index.html（JS/CSS/字体全部内联）
npm run preview    # 本地预览构建产物
```

产物 `dist/index.html` 为**自包含单文件**：不依赖服务器，双击即可在浏览器打开；
也支持正常部署（Vercel / Netlify / Nginx / GitHub Pages 均可，配合同目录 `favicon.svg` 使用）。

## 目录结构

```
├── index.html                # 入口 HTML（标题 / SEO meta / favicon）
├── vite.config.js
├── public/favicon.svg
└── src/
    ├── main.jsx              # 入口（引入字体 + 全局样式）
    ├── App.jsx               # 页面骨架
    ├── data.js               # ★ 全站文案/数据 —— 全部企业资料在此
    ├── styles.css            # ★ 设计系统：色彩 token / 按钮 / 动效
    └── components/           # Nav/Hero/About/Courses/Team/Outcomes/Footer/Reveal
```

## 页面区块

| 区块 | 锚点 | 组件 | 对应企业资料 |
|---|---|---|---|
| 全屏 Hero（定位主张 + CTA） | #top | `Hero.jsx` | 技能 vs 学科主张、营期要素 |
| 机构介绍（背景 / 理念 / 数据带） | #about | `About.jsx` | 项目背景、教学核心理念、北大体系 |
| 三周浸泡营（产品大卡 / 三级跃迁 / 差异化对比 / 入营要求） | #courses | `Courses.jsx` | 营期信息、成长路径、240h vs 60h、入营要求 |
| 外教团队（全外教零中教模式卡） | #team | `Team.jsx` | 全外教零中教教学模式（个人资料待补） |
| 学员收获（成长弧线 / 八大心理障碍 / 定位宣言） | #outcomes | `Outcomes.jsx` | 蜕变纪实方向、八大障碍清单 |
| 全屏收束页（营地信息 / 预约表单 / 版权） | #contact | `Footer.jsx` | 开营日期等（联系方式待补） |

## 待你补充的资料（页面已做克制占位，非编造）

打开 `src/data.js`，以下内容均标有注释：

1. **联系方式**：真实微信 / 电话 / 邮箱 → `contact.items` + `contact.leadForm.mailTo`
   （现为演示通道：表单提交会唤起邮件客户端发送至示例邮箱 `contact@tifsc.example.com`）
2. **营地具体地址** → `contact.items[1].note`
3. **外教个人资料**（姓名 / 履历 / 照片）→ 目前外教模块是"全外教零中教"模式卡，
   提供资料后可将 `team.cards` 结构替换为个人卡片（v0.1 有可参考的实现，`git show a340fe3:src/components/Team.jsx`）
4. **ICP 备案号** → `contact.icp`（现为空，页脚不显示）
5. 宣传语 / 具体数字口径如有出入，直接在 `data.js` 中改

## 留言表单接入第三方表单

当前为纯前端方案（mailto）。在 `data.js → contact.leadForm.embedUrl` 填入第三方表单
iframe 嵌入地址（问卷星 / 金数据 / 腾讯问卷等），表单区将整体替换为嵌入表单。

## 部署

纯静态站点，`dist/` 任意静态托管均可：Vercel / Netlify（Build `npm run build`，Output `dist`）、
Nginx（拷入站点根目录）、GitHub Pages。本地双击 `dist/index.html` 亦可离线预览。

## 设计与迭代

- 换肤：改 `styles.css` 顶部 `@theme` 语义色 token
- 字体：Manrope Variable（本地打包，无外网依赖）+ Georgia 斜体点缀 + 系统中文字体
- 动效：入场 CSS `riseIn`；滚动显现 `Reveal.jsx`（IntersectionObserver）；支持 `prefers-reduced-motion`
- 迭代：提供参考截图 → 对照调样式/文案；`git` 已留 v0.1/v0.2 快照可回退
