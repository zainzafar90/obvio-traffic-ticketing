import path from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig, UserConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [react()] as UserConfig["plugins"],

  build: {
    sourcemap: true,
  },
});
