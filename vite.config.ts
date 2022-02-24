/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.token' }); // Used to specifically import the .env.token

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // environment: 'happy-dom',
    deps: {
      // inline: ['element-plus', '@vue']
      inline: ['element-plus']
    },
    include: ['src/**/*.{test,spec}.ts']
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    WindiCSS(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
      dts: 'src/types/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
