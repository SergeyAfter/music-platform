declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      NODE_ENV: string;
      RABBITMQ_SERVER_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
