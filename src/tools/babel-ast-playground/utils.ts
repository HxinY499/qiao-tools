export const initialCode = `
import * as Babel from '@babel/standalone'


const t = Babel.packages.types
const generator = Babel.packages.generator.default
const parser = Babel.packages.parser
const template = Babel.packages.template.default
const traverse = Babel.packages.traverse.default

const stringLiteral = t.stringLiteral('hello world');
const expressionStatement = t.expressionStatement(stringLiteral);

// 需要 export default 生成的 ast
export default expressionStatement
`

export const babel__standalone__type = (officialCode: string) => {
  return `
import template from "@babel/template";
import traverse, { Hub, NodePath, Scope, visitors } from "@babel/traverse";
import generator from '@babel/generator'
import { parse, parseExpression, tokTypes } from '@babel/parser'
import * as t from "@babel/types"
${officialCode}
export declare const packages: {
  template: {default: typeof template} & typeof template,
  traverse: {
    Hub: typeof Hub,
    NodePath: typeof NodePath,
    Scope: typeof Scope,
    visitors: typeof visitors,
    default: typeof traverse
  },
  generator: { default: typeof generator },
  parser: {
    parse: typeof parse,
    parseExpression: typeof parseExpression,
    tokTypes: typeof tokTypes
  },
  types: typeof t
};
      `
}

const getCode = async (url: string) => await (await fetch(url)).text()

export const extraLibs = [
  {
    code: await getCode('https://esm.sh/@babel/types@7.24.6/lib/index.d.ts'),
    path: `file:///node_modules/@types/babel__types/index.d.ts`
  },
  {
    code: await getCode('https://esm.sh/@babel/parser@7.24.6/typings/babel-parser.d.ts'),
    path: `file:///node_modules/@types/babel__parser/index.d.ts`
  }
]

export const shikiLanguages = ['javascript', 'typescript', 'json', 'tsx', 'vue'] as const
