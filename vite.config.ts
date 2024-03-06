import { fileURLToPath, URL } from "node:url";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: path.join(__dirname, "docs"),
  },
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Coursely PWA App",
        short_name: "Coursely Vue",
        theme_color: "#FFF8F0",
        background_color: "#000000",
        display: "standalone",
        scope: "/",
        start_url: "/",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
