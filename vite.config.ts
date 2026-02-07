import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false  // Disable error overlay for now
    },
    port: 5173,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        exports: "auto",
      },
    },
  },
});
