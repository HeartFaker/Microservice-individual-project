import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0",
    port:81,
    proxy: {
      '/fapig': {
        target:'http://apis.juhe.cn/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            "^/fapig": "/", // 设置/api路径重定向为根目录"/";
        },

      },
      '^/onebox': {
        target:'http://op.juhe.cn/',
        changeOrigin: true,
        secure: false,
      },
      '^/finance': {
        target:'http://web.juhe.cn/',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
