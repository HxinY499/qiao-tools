import Bowser from 'bowser'
import dayjs from 'dayjs'

import { feishu_url, getMsg } from './utils'

export default function entry(toolName?: string) {
  if (import.meta.env.DEV) return

  const storageKey = `__hasVisited__${toolName ?? ''}`
  const hasVisited = sessionStorage.getItem(storageKey)

  if (!hasVisited) {
    sessionStorage.setItem(storageKey, 'true')

    const bowser = Bowser.parse(window.navigator.userAgent)

    const msgArr = [
      { title: '浏览器', content: `${bowser.browser.name}*@${bowser.browser.version}*` },
      { title: '操作系统', content: `${bowser.os.name}*@${bowser.os.version}*` },
      { title: '平台', content: bowser.platform.type },
      { title: '访问域名', content: location.origin },
      { title: '时间', content: dayjs().format('YYYY-MM-DD HH:mm') }
    ]

    if (toolName) {
      msgArr.push({ title: '工具', content: toolName })
    }

    fetch(feishu_url, {
      method: 'POST',
      body: JSON.stringify({
        msg_type: 'interactive',
        card: {
          i18n_header: {
            zh_cn: {
              title: {
                tag: 'plain_text',
                content: 'qiao-tools访问通知'
              },
              template: 'blue'
            }
          },
          elements: [
            {
              tag: 'div',
              text: {
                content: getMsg(msgArr),
                tag: 'lark_md'
              }
            }
          ]
        }
      })
    })
  }
}
