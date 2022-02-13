import { NextRouter, useRouter as useNextRouter } from 'next/router'

type parseQueryResponse = { [key: string]: string }

const parseQuery = (path: string): parseQueryResponse => {
  const query = {}
  const regex = /[?&]([^&$=]+)(=([^&$]+))?/g
  let param: RegExpExecArray

  while ((param = regex.exec(path)) !== null) {
    query[decodeURIComponent(param[1])] = decodeURIComponent(param[3])
  }

  return query
}

export const useRouter = (): NextRouter => {
  const router = useNextRouter()
  router.query = { ...router.query, ...parseQuery(router.asPath) }
  return router
}
