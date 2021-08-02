import { defineConfig } from "vite";
import Path from "path";
import vueJSX from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  base: "/vue/",
  build: {
    rollupOptions: {
      input: {
        main: Path.resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [vueJSX()],
});
