/// <reference types="vite/client" />

declare const Babel: any

interface Window {
  Babel: any
}

type MaybeGetter<T> = T | (() => T)
