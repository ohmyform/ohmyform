import { Alert, Layout } from 'antd'
import { AuthFooter } from 'components/auth/footer'
import { GetStaticProps, NextPage } from 'next'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingPage } from '../components/loading.page'
import { Omf } from '../components/omf'
import { useStatusQuery } from '../graphql/query/status.query'
import { NextConfigType } from '../next.config.type'

const { publicRuntimeConfig } = getConfig() as NextConfigType

const Index: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(
    publicRuntimeConfig.spa || (process.browser && router.pathname !== window.location.pathname)
  )
  const status = useStatusQuery()

  useEffect(() => {
    if (router.pathname !== window.location.pathname) {
      let href = router.asPath
      const as = router.asPath
      const possible = [
        /(\/form\/)[^/]+/i, /(\/admin\/forms\/)[^/]+/i, /(\/admin\/users\/)[^/]+/i,
      ]

      possible.forEach((r) => {
        if (r.test(as)) {
          href = href.replace(r, '$1[id]')
        }
      })

      router.replace(href, as).catch((e: Error) => {
        console.error('failed redirect', e)
      })
    }
  })

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 10000)
    }
  }, [loading])

  if (loading) {
    return <LoadingPage message={t('loading')} />
  }

  return (
    <Layout
      style={{
        height: '100vh',
        background: publicRuntimeConfig.mainBackground,
      }}
    >
      <Omf />
      <div
        style={{
          margin: 'auto',
          maxWidth: '90%',
          width: 500,
          textAlign: 'center',
        }}
      >
        <img
          alt={'OhMyForm'}
          src={require('../assets/images/logo_white.png?resize&size=512')}
          width={1608 / 4}
          height={530 / 4}
        />
      </div>

      {status.error && (
        <Alert
          message={`There is an error with your API connection: ${status.error.message}`}
          style={{ marginBottom: 40, marginLeft: 16, marginRight: 16 }}
        />
      )}
      <AuthFooter />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // just to be conforming with eslint
  await Promise.resolve()

  return {
    revalidate: 10,
    props: {},
  }
}

export default Index
