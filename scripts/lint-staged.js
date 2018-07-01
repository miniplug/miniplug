const spawn = require('child_process').spawnSync
const mm = require('micromatch')

const patterns = [
  'rollup.config.js',
  'scripts/**/*.js',
  'src/**/*.js',
  'test/**/*.js'
]

const out = spawn('git', ['diff', '--cached', '--name-only']).stdout.toString()
const list = out.split('\n').filter(Boolean)

const files = mm(list, patterns)
if (files.length > 0) {
  const result = spawn('standard', files, {
    stdio: 'inherit'
  })
  process.exit(result.status)
}
process.exit(0)
