import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons/lib'
import React from 'react'

interface Props {
  isLive: boolean
}

export const FormIsLive: React.FC<Props> = (props) => {
  if (props.isLive) {
    return (
      <CheckCircleOutlined
        style={{
          color: 'green',
        }}
      />
    )
  }

  return (
    <CloseCircleOutlined
      style={{
        color: 'red',
      }}
    />
  )
}
