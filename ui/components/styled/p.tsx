import React from 'react'
import styled from 'styled-components'
import { FormPublicDesignFragment } from '../../graphql/fragment/form.public.fragment'

interface Props {
  type: 'question' | 'answer'
  design: FormPublicDesignFragment
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
const Paragraph = styled.p`
  color: ${(props: Props) =>
    props.type === 'question' ? props.design.colors.question : props.design.colors.answer};
`

export const StyledP: React.FC<Props> = ({ children, ...props }) => {
  return <Paragraph {...props}>{children}</Paragraph>
}
