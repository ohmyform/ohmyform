import React from 'react'
import {
  FormPublicDesignFragment,
  FormPublicFieldFragment,
} from '../../../../graphql/fragment/form.public.fragment'
import { StyledH1 } from '../../../styled/h1'
import { StyledMarkdown } from '../../../styled/markdown'
import { useRouter } from '../../../use.router'
import { fieldTypes } from '../../types'
import { TextType } from '../../types/text.type'
import { FieldTypeProps } from '../../types/type.props'

interface Props {
  focus: boolean
  field: FormPublicFieldFragment
  design: FormPublicDesignFragment
}

export const Field: React.FC<Props> = ({ field, design, focus, ...props }) => {
  const router = useRouter()

  const FieldInput: React.FC<FieldTypeProps> = fieldTypes[field.type] || TextType

  const getUrlDefault = (): string => {
    if (router.query[field.id]) {
      return router.query[field.id] as string
    }

    if (router.query[field.slug]) {
      return router.query[field.slug] as string
    }

    return undefined
  }

  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 32,
          justifyContent: 'flex-end',
        }}
      >
        <StyledH1 design={design} type={'question'}>
          {field.title}
        </StyledH1>
        {field.description && (
          <StyledMarkdown design={design} type={'question'} >{field.description}</StyledMarkdown>
        )}

        <FieldInput design={design} field={field} urlValue={getUrlDefault()} focus={focus} />
      </div>
    </div>
  )
}
