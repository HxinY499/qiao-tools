import Babel from 'https://esm.sh/@babel/standalone@7.24.6'

/* eslint-disable no-unused-vars */
const consoleStyle = 'color: black; font-style: italic; background-color: yellow;padding: 2px'
const log = (msg) => console.log('%c[from worker]', consoleStyle, msg)
const warn = (msg) => console.warn('%c[from worker]', consoleStyle, msg)
const error = (msg) => console.error('%c[from worker]', consoleStyle, msg)
/* eslint-enable no-unused-vars */

self.onmessage = async (e) => {
  const sourceCode = e.data.sourceCode

  if (sourceCode?.length) {
    doWork(sourceCode)
  }
}

async function doWork(sourceCode) {
  try {
    const t = Babel.packages.types

    const code = transformCode(sourceCode)
    const url = URL.createObjectURL(new Blob([code], { type: 'application/javascript' }))

    const importRes = await import(/* @vite-ignore */ url)
    const ast = importRes.default

    let fileAst

    if (Array.isArray(ast)) {
      fileAst = t.file(t.program(ast))
    } else {
      fileAst = t.isFile(ast) ? ast : t.file(t.program([ast]))
    }
    const targetCode = Babel.packages.generator.default(fileAst).code

    self.postMessage({ targetCode, ast: ast, wholeAst: fileAst, success: true })

    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 300)
  } catch (err) {
    error(err)
    self.postMessage({ message: err, success: false })
  }
}

const consoleName = ['log', 'info', 'error', 'debug']

function transformCode(sourceCode) {
  let defaultImportStatementCount = 0
  const transformRes = Babel.transform(sourceCode, {
    presets: ['typescript'],
    filename: 'playground.ts',
    plugins: [
      {
        visitor: {
          ImportDeclaration(path) {
            const source = path.node.source.value
            if (source === '@babel/standalone') {
              path.node.source.value = 'https://esm.sh/@babel/standalone@7.24.6'
            } else if (!source.startsWith('.') && !source.startsWith('/')) {
              path.node.source.value = `https://esm.sh/${path.node.source.value}`
            }
          },
          ExportDefaultDeclaration() {
            defaultImportStatementCount++
          },
          CallExpression(path) {
            const callee = path.node.callee ?? {}
            if (
              callee.type === 'MemberExpression' &&
              callee.object.name === 'console' &&
              consoleName.includes(callee.property.name)
            ) {
              path.node.arguments.unshift(
                Babel.packages.types.stringLiteral(
                  'font-style: italic; background-color: green;padding: 2px'
                )
              )
              path.node.arguments.unshift(Babel.packages.types.stringLiteral('%c[from playground]'))
            }
          }
        }
      }
    ]
  })

  if (defaultImportStatementCount === 0) {
    throw new Error('必须要有export default语句，请默认导出需要转换的ast')
  }
  return transformRes.code
}
