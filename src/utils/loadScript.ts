export default function loadScript(
  src: string,
  option?: {
    /** 如果设置了id，在加载之前会先用document.getElementById检查是否已存在标签，存在则不会再加载 */
    id?: string
    async?: boolean
    defer?: boolean
  }
) {
  const { id, async, defer } = option ?? {}

  if (id) {
    const found = document.getElementById(id)
    if (found) return
  }

  return new Promise<boolean>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src

    if (async) script.async = true
    if (defer) script.defer = true
    document.head.appendChild(script)

    script.onload = () => {
      resolve(true)
    }

    script.onerror = () => {
      reject(false)
    }
  })
}
