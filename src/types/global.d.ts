declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
  
  namespace NodeJS {
    interface Process {
      env: ProcessEnv;
    }
    interface ProcessEnv {
      [key: string]: string | undefined;
      NODE_ENV: "development" | "production" | "test";
      VITE_API_URL: string;
      VITE_APP_NAME: string;
    }
  }
  
  const process: NodeJS.Process;
}

export {};
