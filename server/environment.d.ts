declare global {
  namespace NodeJS {
    interface ProcessEnv {
      IMGBB_API_KEY: string;
      PORT?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
