/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
  readonly NODE_ENV: 'development' | 'production'
  // Add other environment variables here as you use them
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
