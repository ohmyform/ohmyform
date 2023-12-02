import { Radio } from 'antd'
import { RadioProps } from 'antd/lib/radio/interface'
import React from 'react'
import styled from 'styled-components'
import { FormPublicDesignFragment } from '../../graphql/fragment/form.public.fragment'

interface Props extends RadioProps {
  design: FormPublicDesignFragment
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Field = styled(Radio)`
  color: ${(props: Props) => props.design.colors.answer};
  border-color: ${(props: Props) => props.design.colors.answer};
  background: none;

  .ant-radio {
    .ant-radio-inner {
      border-color: ${(props: Props) => props.design.colors.answer};

      &::after {
        background: ${(props: Props) => props.design.colors.answer};
      }
    }

    &::after {
      border-color: ${(props: Props) => props.design.colors.answer};
    }
  }

  .anticon {
    color: ${(props: Props) => props.design.colors.answer};
  }
`

export const StyledRadio: React.FC<Props> = ({ children, ...props }) => {
  return <Field {...props}>{children}</Field>
}
