import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'builtin-modules'

const { dependencies } = require('./package.json')

export default {
  entry: 'es/index.js',
  format: 'cjs',
  dest: 'index.js',
  exports: 'default',
  external: [ ...builtins, ...Object.keys(dependencies) ],
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: false,
      preferBuiltins: true
    })
  ]
}
