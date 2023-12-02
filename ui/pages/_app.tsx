import { ApolloProvider } from '@apollo/client'
import 'antd/dist/antd.css'
import 'assets/global.scss'
import 'assets/variables.scss'
import debug from 'debug'
import 'i18n'
import getConfig from 'next/config'
import { AppInitialProps, AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { wrapper } from 'store'
import getClient from '../graphql/client'
import { NextConfigType } from '../next.config.type'

const { publicRuntimeConfig } = getConfig() as NextConfigType

const App: AppType = ({ Component, pageProps }) => {

  useEffect(() => {
    if (publicRuntimeConfig.environment !== 'production') {
      debug.enable('*,-micromark')
    }
  })

  useEffect(() => {
    if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      return
    }

    const resize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  })

  return (
    <ApolloProvider client={getClient()}>
      <Head>
        <title>OhMyForm</title>
        <meta name="theme-color" content={'#4182e4'} />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

App.getInitialProps = (): AppInitialProps => ({
  pageProps: {},
})

export default wrapper.withRedux(App)
