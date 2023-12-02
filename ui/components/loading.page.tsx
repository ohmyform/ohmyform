import { Spin } from 'antd'
import React from 'react'

interface Props {
  message?: string
}

export const LoadingPage: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Spin size="large" />
      {props.message}
    </div>
  )
}
