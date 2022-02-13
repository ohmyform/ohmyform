import debug from 'debug'
import { all, create } from 'mathjs'
import { useState } from 'react'

const logger = debug('useMath')

export const useMath = (): ((
  expression: string,
  values?: { [id: string]: string | number }
) => boolean) => {
  const [math] = useState(create(all, {}))

  return (expression, values) => {
    try {
      let processed = expression

      Object.keys(values).forEach((key) => {
        const r = new RegExp(key.replace('$', '\\$'), 'ig')

        const test = r.test(processed)

        if (test) {
          processed = processed.replace(r, String(values[key]))
        }
      })

      return Boolean(math.evaluate(processed))
    } catch (e) {
      logger(
        'failed to calculate %O: %s',
        {
          expression,
          values,
        },
        e.message
      )

      throw e
    }
  }
}
