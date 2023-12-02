import React from 'react'
import styled from 'styled-components'
import { FormPublicDesignFragment } from '../../graphql/fragment/form.public.fragment'

interface Props {
  type: 'question' | 'answer'
  design: FormPublicDesignFragment
}
const Header = styled.h2`
  color: ${(props: Props) =>
    props.type === 'question' ? props.design.colors.question : props.design.colors.answer};
`

export const StyledH2: React.FC<Props> = ({ children, ...props }) => {
  return <Header {...props}>{children}</Header>
}
