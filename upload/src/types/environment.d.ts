declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: string;
      RABBITMQ_SERVER_URL: string;
      RABBITMQ_QUEUE: string;
      YANDEX_KEY_ID: string;
      YANDEX_SECRET_KEY: string;
      YANDEX_BUCKET_NAME: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
