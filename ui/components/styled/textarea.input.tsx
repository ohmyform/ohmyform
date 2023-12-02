import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input/TextArea'
import { transparentize } from 'polished'
import React from 'react'
import styled from 'styled-components'
import { FormPublicDesignFragment } from '../../graphql/fragment/form.public.fragment'

interface Props extends TextAreaProps {
  design: FormPublicDesignFragment
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Field = styled(Input.TextArea)`
  color: ${(props: Props) => props.design.colors.answer};
  border-color: ${(props: Props) => props.design.colors.answer};
  background: none !important;
  border-right: none;
  border-top: none;
  border-left: none;
  border-radius: 0;

  :focus {
    outline: none;
    box-shadow: none;
    border-color: ${(props: Props) => props.design.colors.answer};
  }

  :hover,
  :active {
    border-color: ${(props: Props) => props.design.colors.answer};
  }

  input {
    background: none !important;
    color: ${(props: Props) => props.design.colors.answer};

    ::placeholder {
      color: ${(props: Props) => transparentize(0.6, props.design.colors.answer)};
    }
  }

  .anticon {
    color: ${(props: Props) => props.design.colors.answer};
  }
`

export const StyledTextareaInput: React.FC<Props> = ({ children, ...props }) => {
  return <Field {...props}>{children}</Field>
}
