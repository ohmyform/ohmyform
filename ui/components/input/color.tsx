import React, { useEffect } from 'react'
import { BlockPicker } from 'react-color'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

export const InputColor: React.FC<Props> = (props) => {
  useEffect(() => {
    if (!props.value) {
      props.onChange('#FFF')
    }
  }, [props.value])

  return (
    <BlockPicker
      triangle={'hide'}
      width={'100%'}
      color={props.value}
      onChange={(e: { hex: string }) => props.onChange(e.hex)}
      styles={{
        default: {
          card: {
            flexDirection: 'row',
            display: 'flex',
            boxShadow: 'none',
          },
          head: {
            flex: 1,
            borderRadius: 6,
            height: 'auto',
          },
        },
      }}
    />
  )
}
