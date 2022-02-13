const fs = require('fs');
const glob = require('glob');
const { program } = require('commander');
const merge = require('lodash.merge');
const dirs: string[] = []

program.version('1.0.0');
program
  .arguments('<limit>')
  .action((limit) => {
    dirs.push(
      ...limit
        .split(',')
        .map(l => `locales/${l}/`)
    )
  })
  .option('-l, --limit <limit>', 'check only given languages')
  .parse(process.argv);

let all = {}

glob.sync('locales/**/*.json').forEach(file => {
  try {
    const original = JSON.parse(fs.readFileSync(file))

    all = merge(
      all,
      {
        [file.replace(/^.*\/([a-z]+)\.json$/, '$1')]: original
      }
    )
  } catch (e) {
    console.error('could not process file', file, e)
  }
})

const compare = (original, compareTo, path, file) => {
  const oKeys = Object.keys(original)
  const aKeys = Object.keys(compareTo)

  const missing = aKeys.filter(k => !oKeys.includes(k))

  missing.forEach(k => {
    console.log(`MISSING ${file} > ${[...path, k].join('.')}`)
  })

  oKeys.forEach(k => {
    if (typeof original[k] === 'object') {
      compare(original[k], compareTo[k], [...path, k], file)
    }
  })
}

dirs.forEach(dir => {
  const files: string[] = glob.sync(`${dir}*.json`)

  const existingFiles = files.map(file => file.replace(/^.*\/([a-z]+)\.json$/, '$1')).push('language')
  Object
    .keys(all)
    .filter(file => !existingFiles.includes(file))
    .forEach(file => {
      console.log(`MISSING ${dir}${file}.json`)
    })

  files.forEach(file => {
    try {
      compare(
        JSON.parse(fs.readFileSync(file)),
        all[file.replace(/^.*\/([a-z]+)\.json$/, '$1')],
        [],
        file
      )
    } catch (e) {
      console.error('could not process file', file, e)
    }
  })
})

