import { Tooltip } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'

dayjs.extend(relativeTime)

interface Props {
  date: string
}

export const TimeAgo: React.FC<Props> = (props) => {
  const date = dayjs(props.date)
  return (
    <Tooltip title={date.format('YYYY-MM-DD HH:mm:ss')}>
      <div
        style={{
          display: 'inline-block',
        }}
      >
        {date.fromNow()}
      </div>
    </Tooltip>
  )
}
