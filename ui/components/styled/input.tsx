import { Input } from 'antd'
import { InputProps } from 'antd/lib/input/Input'
import { transparentize } from 'polished'
import React from 'react'
import styled from 'styled-components'
import { FormPublicDesignFragment } from '../../graphql/fragment/form.public.fragment'

interface Props extends InputProps {
  design: FormPublicDesignFragment
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Field = styled(Input)`
  color: ${(props: Props) => props.design.colors.answer};
  border-color: ${(props: Props) => props.design.colors.answer};
  background: none !important;
  border-right: none;
  border-top: none;
  border-left: none;
  border-radius: 0;

  :focus {
    outline: ${(props: Props) => props.design.colors.answer} auto 5px;
  }

  :hover,
  :active {
    border-color: ${(props: Props) => props.design.colors.answer};
  }

  &.ant-input-affix-wrapper {
    box-shadow: none;
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

export const StyledInput: React.FC<Props> = ({ children, ...props }) => {
  return <Field {...props}>{children}</Field>
}
