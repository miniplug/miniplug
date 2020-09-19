import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import builtins from 'builtin-modules'

const pkg = require('../package.json')

export default {
  input: './index.js',
  output: {
    format: 'cjs',
    file: './index.cjs',
    interop: false
  },
  external: [
    ...builtins,
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies)
  ],
  plugins: [
    resolve({
      browser: false,
      preferBuiltins: true
    }),
    commonjs({
      include: 'node_modules/**,*.cjs'
    })
  ]
}
