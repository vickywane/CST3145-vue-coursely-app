// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "file:///Users/victory/Desktop/MIDDLESEX/WEB-MOBILE-APP/COURSE-WORK-3/coursely-sfc-application-upgrade/node_modules/vite-plugin-pwa/dist/index.js";
import { defineConfig } from "file:///Users/victory/Desktop/MIDDLESEX/WEB-MOBILE-APP/COURSE-WORK-3/coursely-sfc-application-upgrade/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/victory/Desktop/MIDDLESEX/WEB-MOBILE-APP/COURSE-WORK-3/coursely-sfc-application-upgrade/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/victory/Desktop/MIDDLESEX/WEB-MOBILE-APP/COURSE-WORK-3/coursely-sfc-application-upgrade/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/victory/Desktop/MIDDLESEX/WEB-MOBILE-APP/COURSE-WORK-3/coursely-sfc-application-upgrade/vite.config.ts";
var vite_config_default = defineConfig({
  // publicDir: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdmljdG9yeS9EZXNrdG9wL01JRERMRVNFWC9XRUItTU9CSUxFLUFQUC9DT1VSU0UtV09SSy0zL2NvdXJzZWx5LXNmYy1hcHBsaWNhdGlvbi11cGdyYWRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdmljdG9yeS9EZXNrdG9wL01JRERMRVNFWC9XRUItTU9CSUxFLUFQUC9DT1VSU0UtV09SSy0zL2NvdXJzZWx5LXNmYy1hcHBsaWNhdGlvbi11cGdyYWRlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy92aWN0b3J5L0Rlc2t0b3AvTUlERExFU0VYL1dFQi1NT0JJTEUtQVBQL0NPVVJTRS1XT1JLLTMvY291cnNlbHktc2ZjLWFwcGxpY2F0aW9uLXVwZ3JhZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIC8vIHB1YmxpY0RpcjogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gXCIvUkVQT19OQU1FL1wiIDogXCIvXCIsXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgICAgaW5qZWN0UmVnaXN0ZXI6IFwiYXV0b1wiXG4gICAgfSlcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNGMsU0FBUyxlQUFlLFdBQVc7QUFFL2UsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFMaVIsSUFBTSwyQ0FBMkM7QUFRclYsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxJQUNsQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
