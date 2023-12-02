import { Form } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledInput } from '../../../styled/input'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('link.input')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function LinkInput ({
  field,
  design,
  urlValue,
  focus,
}) {
  const { t } = useTranslation()

  let initialValue = null

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
        rules={[
          { required: field.required, message: t('validation:valueRequired') },
          { type: 'url', message: t('validation:invalidUrl') },
        ]}
        initialValue={initialValue}
      >
        <StyledInput autoFocus={focus} design={design} allowClear size={'large'} />
      </Form.Item>
    </div>
  )
}
