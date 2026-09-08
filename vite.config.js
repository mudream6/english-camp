import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' 让产物使用相对路径 —— 可部署到任意子路径 / 静态目录，甚至本地直接打开
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: { host: true, port: 5173 },
  build: { target: 'es2019', assetsInlineLimit: 8192 },
})
