import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    commonjsOptions: {
      // Force transformation of CommonJS
      transformMixedEsModules: true,
      // Explicitly include problematic files
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        // Auto-detect exports
        exports: "auto",
        // Prevent name collisions
        format: "es",
      },
    },
  },
  optimizeDeps: {
    // Force pre-bundling of CommonJS modules
    include: [],
    exclude: [],
  },
});
