import Bowser from 'bowser'
import dayjs from 'dayjs'

import { feishu_url, getMsg } from './utils'

export default function errorCapture(error: Error) {
  if (import.meta.env.DEV) return

  const bowser = Bowser.parse(window.navigator.userAgent)

  const msgArr = [
    { title: '浏览器', content: `${bowser.browser.name}*@${bowser.browser.version}*` },
    { title: '操作系统', content: `${bowser.os.name}*@${bowser.os.version}*` },
    { title: '平台', content: bowser.platform.type },
    { title: '访问地址', content: location.href },
    { title: '时间', content: dayjs().format('YYYY-MM-DD HH:mm') }
  ]

  fetch(feishu_url, {
    method: 'POST',
    body: JSON.stringify({
      msg_type: 'interactive',
      card: {
        i18n_header: {
          zh_cn: {
            title: {
              tag: 'plain_text',
              content: 'qiao-tools报错通知'
            },
            template: 'red'
          }
        },
        elements: [
          {
            tag: 'div',
            text: {
              content: getMsg(msgArr),
              tag: 'lark_md'
            }
          },
          {
            tag: 'hr'
          },
          {
            tag: 'markdown',
            content: ':CrossMark:**错误信息**',
            text_align: 'left',
            text_size: 'normal'
          },
          {
            tag: 'div',
            text: {
              content: `${getMsg([
                { title: 'name', content: error?.name },
                { title: 'message', content: error?.message },
                { title: 'stack', content: error?.stack }
              ])}`,
              tag: 'lark_md'
            }
          }
        ]
      }
    })
  })
}
