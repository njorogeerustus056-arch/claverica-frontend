import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";  // ADDED: SVG plugin
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr({  // ADDED: Configure SVG plugin
      svgrOptions: {
        icon: true,
        svgo: true,
      },
      include: "**/*.svg",
    }),
  ],
  server: {
    hmr: {
      overlay: false
    },
    port: 5173,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
    rollupOptions: {  // ADDED: Rollup options for better bundling
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@emotion/react'],
          ui: ['@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Fix for react-helmet-async
      "react": path.resolve(__dirname, "node_modules/react"),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],  // ADDED: SVG extension
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@emotion/react",
      "@emotion/styled",
      "react-helmet-async"
    ],
    exclude: [],  // ADDED: Clear exclusions
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      loader: {  // ADDED: File type loaders
        '.svg': 'jsx',
      },
    },
  },
});