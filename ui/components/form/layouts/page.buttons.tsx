import { Space } from 'antd'
import React from 'react'
import { FormPublicPageButtonFragment } from '../../../graphql/fragment/form.public.fragment'
import { StyledButton } from '../../styled/button'

interface Props {
  buttons: FormPublicPageButtonFragment[]
}

export const PageButtons: React.FC<Props> = ({ buttons }) => {
  if (buttons.length === 0) {
    return null
  }

  return (
    <Space>
      {buttons.map((button, key) => {
        return (
          <StyledButton
            background={button.bgColor}
            color={button.color}
            highlight={button.activeColor}
            key={key}
            href={button.url}
            target={'_blank'}
            rel={'noreferrer'}
          >
            {button.text}
          </StyledButton>
        )
      })}
    </Space>
  )
}
