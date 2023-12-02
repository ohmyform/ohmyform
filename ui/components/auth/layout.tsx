import { Layout, Spin } from 'antd'
import getConfig from 'next/config'
import React from 'react'
import { NextConfigType } from '../../next.config.type'

const { publicRuntimeConfig } = getConfig() as NextConfigType

interface Props {
  loading?: boolean
}

export const AuthLayout: React.FC<Props> = (props) => {
  return (
    <Spin spinning={props.loading || false}>
      <Layout
        style={{
          height: '100vh',
          background: publicRuntimeConfig.mainBackground,
        }}
      >
        {props.children}
      </Layout>
    </Spin>
  )
}
