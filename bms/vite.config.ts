import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "mock", // mock 文件目录
      enable: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/vars.scss" as *;`, // 全局注入变量
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"), // 确保 @ 路径正确
    },
  },
});
