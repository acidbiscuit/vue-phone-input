import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/PhoneInput'),
      name: 'PhoneInput',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        entryFileNames: 'vue-phone-input.js',
        globals: {
          vue: 'Vue'
        },
      },
    }
  },
})
