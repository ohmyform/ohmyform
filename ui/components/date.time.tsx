import dayjs from 'dayjs'
import React from 'react'

interface Props {
  date: string

  hideTime?: boolean
}

export const DateTime: React.FC<Props> = (props) => {
  const format = props.hideTime ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'

  return (
    <div
      style={{
        display: 'inline-block',
      }}
    >
      {dayjs(props.date).format(format)}
    </div>
  )
}
