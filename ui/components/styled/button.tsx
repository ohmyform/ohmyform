import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import { darken, lighten } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface Props extends ButtonProps {
  background: string
  highlight: string
  color: string
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Styled = styled(Button)`
  background: ${(props: Props) => props.background};
  color: ${(props: Props) => props.color};
  border-color: ${(props: Props) => darken(0.1, props.background)};

  :hover {
    color: ${(props: Props) => props.highlight};
    background-color: ${(props: Props) => lighten(0.1, props.background)};
    border-color: ${(props: Props) => darken(0.1, props.highlight)};
  }
`

export const StyledButton: React.FC<Props> = ({ children, ...props }) => {
  return <Styled {...props}>{children}</Styled>
}
