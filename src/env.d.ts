/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PIPEDRIVE_API_TOKEN: string
  readonly VITE_PIPEDRIVE_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 