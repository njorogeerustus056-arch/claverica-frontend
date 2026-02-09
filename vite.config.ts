import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Simple chunking strategy without circular dependencies
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/lucide-react") || id.includes("node_modules/recharts")) {
            return "ui-vendor";
          }
          if (id.includes("node_modules/date-fns") || id.includes("node_modules/axios") || id.includes("node_modules/formik")) {
            return "utils-vendor";
          }
          if (id.includes("node_modules/@radix-ui")) {
            return "radix-ui";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    historyApiFallback: true,
  },
});
