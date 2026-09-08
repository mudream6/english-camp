import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// 单文件构建：JS/CSS/字体全部内联进 dist/index.html，
// 支持双击 file:// 直接打开（无需服务器），也可正常部署。
// base: './' 保证相对路径解析。
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  server: { host: true, port: 5173 },
  // assetsInlineLimit 调大：让 woff2 字体也以内联 data:URI 打包，产物完全自包含
  build: { target: 'es2019', assetsInlineLimit: 100000000 },
})
