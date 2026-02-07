import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");
  
  // Ensure VITE_API_URL is always set
  if (!env.VITE_API_URL) {
    console.warn("??  VITE_API_URL is not set in environment");
    env.VITE_API_URL = mode === "production" 
      ? "https://claverica.onrender.com" 
      : "http://localhost:8000";
  }
  
  return {
    plugins: [react()],
    define: {
      // Make environment variables available
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
      "import.meta.env.VITE_APP_ENV": JSON.stringify(env.VITE_APP_ENV || mode),
      // Ensure no problematic globals
      "window.forceLocalhostActive": false,
      "global.exports": undefined
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      // Ensure clean CommonJS handling
      commonjsOptions: {
        transformMixedEsModules: true
      },
      rollupOptions: {
        output: {
          // Prevent module.exports issues
          exports: "auto"
        }
      }
    },
    // Clear any module pre-bundling that might cause issues
    optimizeDeps: {
      exclude: []
    }
  };
});
