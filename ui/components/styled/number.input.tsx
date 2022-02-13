import { InputNumber } from 'antd'
import { InputNumberProps } from 'antd/lib/input-number'
import { transparentize } from 'polished'
import React from 'react'
import styled from 'styled-components'
import { FormPublicDesignFragment } from '../../graphql/fragment/form.public.fragment'

interface Props extends InputNumberProps {
  design: FormPublicDesignFragment
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Field = styled(InputNumber)`
  color: ${(props: Props) => props.design.colors.answer};
  border-color: ${(props: Props) => props.design.colors.answer};
  background: none !important;
  border-right: none;
  border-top: none;
  border-left: none;
  border-radius: 0;
  width: 100%;

  :focus {
    outline: ${(props: Props) => props.design.colors.answer} auto 5px;
  }

  :hover,
  :active {
    border-color: ${(props: Props) => props.design.colors.answer};
  }

  &.ant-input-number {
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

export const StyledNumberInput: React.FC<Props> = ({ children, ...props }) => {
  return <Field {...props}>{children}</Field>
}
