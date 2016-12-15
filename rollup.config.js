import resolve from 'rollup-plugin-node-resolve'
import builtins from 'builtin-modules'

const pkg = require('./package.json')

export default {
  entry: 'es/index.js',
  targets: [
    { format: 'cjs', dest: 'index.js' },
    { format: 'es', dest: 'index.es.js' }
  ],
  exports: 'default',
  external: builtins.concat(Object.keys(pkg.dependencies)),
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: false,
      preferBuiltins: true
    })
  ]
}
