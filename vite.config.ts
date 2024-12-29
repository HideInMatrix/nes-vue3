import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoComplete from "unplugin-auto-import/vite";
import rollupDelete from "rollup-plugin-delete";
import { resolve } from "path";

const pathSrc = resolve(__dirname, "src");
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${pathSrc}/`,
    },
  },
  plugins: [
    vue(),
    AutoComplete({
      imports: ["vue"],
      dts: resolve(pathSrc, "auto-imports.d.ts"),
    }),
  ],
  build: {
    lib: {
      entry: resolve("src/index.ts"),
      name: "NesVue",
      fileName: (format) => `nes-vue.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        // 为外部依赖提供全局变量
        globals: { NesVue: "NesVue" },
      },
      plugins: [
        rollupDelete({
          targets: ["dist/*.{ico,txt,svg,nes,NES,fm2}"],
          hook: "generateBundle",
        }),
      ],
    },
  },
});
