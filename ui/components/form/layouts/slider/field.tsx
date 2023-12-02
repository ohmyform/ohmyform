import { Form, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  FormPublicDesignFragment,
  FormPublicFieldFragment,
} from '../../../../graphql/fragment/form.public.fragment'
import { StyledButton } from '../../../styled/button'
import { StyledH1 } from '../../../styled/h1'
import { StyledMarkdown } from '../../../styled/markdown'
import { useRouter } from '../../../use.router'
import { fieldTypes } from '../../types'

interface Props {
  focus: boolean
  field: FormPublicFieldFragment
  design: FormPublicDesignFragment

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save: (data: any) => void
  next: () => void
  prev: () => void
}

export const Field: React.FC<Props> = ({ field, save, design, next, prev, ...props }) => {
  const [form] = useForm()
  const router = useRouter()
  const { t } = useTranslation()

  const FieldInput = (fieldTypes[field.type] || fieldTypes[field.type]).inputFormField()

  const finish = (data) => {
    console.log('received field data', data)
    save(data)
    next()
  }

  const error = async () => {
    await message.error('Check inputs!')
  }

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
    <Form
      form={form}
      onFinish={finish}
      onFinishFailed={error}
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
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
          <StyledMarkdown design={design} type={'question'}>{field.description}</StyledMarkdown>
        )}

        <FieldInput
          design={design}
          field={field}
          focus={props.focus}
          urlValue={getUrlDefault()}
        />
      </div>
      <div
        style={{
          padding: 32,
          display: 'flex',
        }}
      >
        <StyledButton
          background={design.colors.button}
          color={design.colors.buttonText}
          highlight={design.colors.buttonActive}
          onClick={prev}
        >
          {t('form:previous')}
        </StyledButton>

        <div style={{ flex: 1 }} />

        <StyledButton
          background={design.colors.button}
          color={design.colors.buttonText}
          highlight={design.colors.buttonActive}
          size={'large'}
          onClick={form.submit}
        >
          {t('form:next')}
        </StyledButton>
      </div>
    </Form>
  )
}
