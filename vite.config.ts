import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
// export default defineConfig({
//   base: "/enterprise-admin/",
//   plugins: [react(), svgr()],
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const basePath = env.VITE_BASE_PATH || "/";

  return {
    base: basePath,
    plugins: [react(), svgr()],
  };
});
