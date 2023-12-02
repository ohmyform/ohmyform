import { Form } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledTextareaInput } from '../../../styled/textarea.input'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('textarea.input')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function TextareaInput ({
  field,
  design,
  urlValue,
  focus,
}) {
  const { t } = useTranslation()

  let initialValue = undefined

  if (field.defaultValue) {
    try {
      initialValue = parseValue(field.defaultValue)
    } catch (e) {
      logger('invalid default value %O', e)
    }
  }

  if (urlValue) {
    initialValue = parseUrlValue(urlValue)
  }

  return (
    <div>
      <Form.Item
        name={[field.id]}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
      >
        <StyledTextareaInput autoFocus={focus} design={design} allowClear autoSize />
      </Form.Item>
    </div>
  )
}
