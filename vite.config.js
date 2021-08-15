import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./client/src",
  plugins: [reactRefresh()],
  server: {
    cors: true,
  },
  build: {
    sourcemap: true,
  },
});
