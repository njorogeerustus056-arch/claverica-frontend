import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      include: ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"],
      jsxRuntime: "automatic",
      babel: {
        presets: [["@babel/preset-react", { runtime: "automatic" }]]
      }
    })
  ],
  build: {
    sourcemap: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      }
    }
  }
});
