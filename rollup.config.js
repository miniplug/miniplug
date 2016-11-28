import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'es/index.js',
  format: 'cjs',
  dest: 'index.js',
  exports: 'default',
  external: [ 'events', 'querystring' ].concat(
    Object.keys(require('./package.json').dependencies)
  ),
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
