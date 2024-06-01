import { Ref, watch } from 'vue'

import { Monaco } from '@/module'

export const initialCode = `
import * as Babel from '@babel/standalone'

const t = Babel.packages.types
const generator = Babel.packages.generator.default
const parser = Babel.packages.parser
const template = Babel.packages.template.default
const traverse = Babel.packages.traverse.default

const stringLiteral = t.stringLiteral('hello world');
const expressionStatement = t.expressionStatement(stringLiteral);


const funName = t.identifier('fun')
const param = t.identifier('arg')
const funBody = t.blockStatement([t.returnStatement(t.stringLiteral('hello world'))])

// 需要 export default 生成的 ast
export default t.functionDeclaration(funName, [param], funBody)
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

export const useExtraLibs = async (monaco: Ref<Monaco | undefined>) => {
  type Lib = { code: string; path: string }
  const libQueue: Lib[] = []

  const getCode = async (url: string) => await (await fetch(url)).text()
  const addLib = (lib: Lib) => {
    if (monaco.value) {
      monaco.value.languages.typescript.typescriptDefaults.addExtraLib(lib.code, lib.path)
    } else {
      libQueue.push(lib)
    }
  }

  ;[
    {
      url: 'https://esm.sh/@babel/types@7.24.6/lib/index.d.ts',
      path: `file:///node_modules/@types/babel__types/index.d.ts`
    },
    {
      url: 'https://esm.sh/@babel/parser@7.24.6/typings/babel-parser.d.ts',
      path: `file:///node_modules/@types/babel__parser/index.d.ts`
    },
    {
      url: 'https://esm.sh/@types/babel__traverse@7.20.6/index.d.ts',
      path: `file:///node_modules/@types/babel__traverse/index.d.ts`
    },
    {
      url: 'https://esm.sh/@types/babel__template@7.4.4/index.d.ts',
      path: `file:///node_modules/@types/babel__template/index.d.ts`
    },
    {
      url: 'https://esm.sh/@types/babel-generator@6.25.8/index.d.ts',
      path: `file:///node_modules/@types/babel-generator/index.d.ts`
    },
    {
      url: 'https://esm.sh/@types/babel__standalone@7.1.7/index.d.ts',
      path: `file:///node_modules/@types/babel__standalone/index.d.ts`,
      babel__standalone: true
    }
  ].forEach((config) => {
    getCode(config.url).then((code) => {
      if (config.babel__standalone) {
        code = babel__standalone__type(code)
      }
      addLib({ code, path: config.path })
    })
  })

  watch(
    monaco,
    () => {
      libQueue.forEach((lib) => {
        addLib(lib)
      })
    },
    { once: true }
  )
}

export const shikiLanguages = ['javascript', 'typescript', 'json', 'tsx', 'vue'] as const
