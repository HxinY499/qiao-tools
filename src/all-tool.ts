import { AsyncComponentLoader } from 'vue'

export enum ToolName {
  ScrollBarConfig = 'ScrollBarConfig',
  AstToCode = 'AstToCode',
  BabelASTPlayground = 'BabelASTPlayground'
}

declare global {
  interface ToolInfo {
    title: string
    description?: string
    name: ToolName
    cover?: string
    path: string
    keepAlive?: boolean
    component: AsyncComponentLoader
  }
}

export default [
  {
    title: 'scroll-bar 可视化',
    name: ToolName.ScrollBarConfig,
    cover: '/scroll-bar.svg',
    description: '调整关于滚动条的样式，所见即所得！🥳',
    path: 'scrollbar',
    component: () => import('@/tools/scroll-bar')
  },
  {
    title: 'Babel AST Playground',
    name: ToolName.BabelASTPlayground,
    description: '编写babel代码生成AST，并且实时查看对应的结果代码！🤩',
    cover: '/ast-code.svg',
    component: () => import('@/tools/babel-ast-playground'),
    keepAlive: true,
    path: 'babel-ast-playground'
  }
] as ToolInfo[]
