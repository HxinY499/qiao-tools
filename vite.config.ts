import { vitePluginForArco } from '@arco-plugins/vite-vue'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
// import jsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // jsx(),
    vitePluginForArco({
      theme: '@arco-themes/vue-qiao-tools',
      style: 'css'
    }),
    VueDevTools(),
    visualizer()
  ],
  server: {
    port: 8100,
    open: true
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  build: {
    minify: true
  }
})
