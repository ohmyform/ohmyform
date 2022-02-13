import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMeQuery } from '../graphql/query/me.query'
import { LoadingPage } from './loading.page'

export const clearAuth = (): void => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
}

export const setAuth = (access: string, refresh: string): void => {
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export const withAuth = (Component: any, roles: string[] = [], optional?: boolean): React.FC => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [access, setAccess] = useState(false)
    const { loading, data, error } = useMeQuery()

    useEffect(() => {
      if (roles.length === 0) {
        setAccess(true)
        return
      }
      setAccess(false)
      if (!error) {
        return
      }

      localStorage.clear()
      const path = router.asPath || router.pathname
      localStorage.setItem('redirect', path)

      router.push('/login').catch((e: Error) => console.error('failed to redirect to login', e))
    }, [error])

    useEffect(() => {
      if (!data || roles.length === 0) {
        setAccess(true)
        return
      }

      const next = roles.map((role) => data.me.roles.includes(role)).filter((p) => p).length > 0

      setAccess(next)

      if (!next) {
        router.push('/').catch((e: Error) => console.error('failed to redirect to /', e))
      }
    }, [data])

    if (!optional) {
      if (loading) {
        return <LoadingPage message={t('loadingCredentials')} />
      }

      if (!access) {
        return <LoadingPage message={t('checkingCredentials')} />
      }
    }

    return <Component me={data && data.me} {...props} />
  }
}
