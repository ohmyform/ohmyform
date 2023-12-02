import { Tag } from 'antd'
import React, { CSSProperties } from 'react'

interface Props {
  roles: string[]
}

export const UserRole: React.FC<Props> = (props) => {
  let color: string
  let level = 'unknown'
  const css: CSSProperties = {}

  if (props.roles.includes('superuser')) {
    color = 'red'
    level = 'superuser'
  } else if (props.roles.includes('admin')) {
    color = 'orange'
    level = 'admin'
  } else if (props.roles.includes('user')) {
    color = '#F0F0F0'
    css.color = '#AAA'
    level = 'user'
  }

  return (
    <Tag color={color} style={css}>
      {level.toUpperCase()}
    </Tag>
  )
}
