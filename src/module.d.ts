import type * as MonacoType from 'monaco-editor'

export type Monaco = typeof MonacoType
export type MonacoEditor = ReturnType<Monaco['editor']['create']>

declare module 'vue' {
  interface CSSProperties {
    [key: `--${string}`]: string
  }
}

export {}
