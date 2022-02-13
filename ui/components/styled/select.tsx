import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { transparentize } from 'polished'
import React from 'react'
import styled from 'styled-components'
import { FormPublicDesignFragment } from '../../graphql/fragment/form.public.fragment'

interface Props extends SelectProps<string> {
  design: FormPublicDesignFragment
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Field = styled(Select)`
  .ant-select-selector {
    color: ${(props: Props) => props.design.colors.answer};
    border-color: ${(props: Props) => props.design.colors.answer} !important;
    background: none !important;
    border-right: none !important;
    border-top: none !important;
    border-left: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  :focus {
    outline: ${(props: Props) => props.design.colors.answer} auto 5px;
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

export const StyledSelect: React.FC<Props> = ({ children, ...props }) => {
  return <Field {...props}>{children}</Field>
}
