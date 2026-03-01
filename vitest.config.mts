import * as path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, ViteUserConfig } from "vitest/config";
import { PluginOption } from "vite";

export default defineConfig({
  plugins: [react()] as PluginOption[],
  test: {
    exclude: ["node_modules/**", "e2e/**"],
    globals: true,
    environment: "happy-dom",
    setupFiles: "vitest-setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["**/src"],
      ignoreEmptyLines: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
} as ViteUserConfig);
