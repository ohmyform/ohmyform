const fs = require('fs');
const glob = require('glob');
const { program } = require('commander');

program.version('1.0.0');
program
  .option('-f, --force', 'force write to existing files')

program.parse(process.argv);

const sort = obj => {
  if (typeof obj !== 'object') {
    return obj
  }

  const result = {}

  Object
    .keys(obj)
    .sort()
    .map(key => {
      result[key] = sort(obj[key])
    })

  return result
}

glob.sync('locales/*/').forEach(dir => {
  const files: string[] = glob.sync(`${dir}*.json`)

  files.forEach(file => {
    try {
      const raw = fs.readFileSync(file)
      const original = JSON.parse(raw)
      const sorted = sort(original)
      const next = JSON.stringify(sorted, null, 2) + "\n"

      if (raw != next) {
        if (!program.force) {
          console.log('changes found, but skipped', file)
          return
        }

        console.log('updated', file)
        fs.writeFileSync(file, next)
      }
    } catch (e) {
      console.error('could not process file', file, e)
    }
  })
})

