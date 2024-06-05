export const feishu_url =
  'https://open.feishu.cn/open-apis/bot/v2/hook/5f8c7178-db9e-4037-b5b6-92c8c5bb3888'

export const getMsg = (arr: Record<'title' | 'content', any>[]) => {
  return arr.map((o) => `**${o.title}**： ${o.content}`).join('\n')
}
