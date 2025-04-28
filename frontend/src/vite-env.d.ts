/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BASE_URL_API: string;
    // otras variables de entorno...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }