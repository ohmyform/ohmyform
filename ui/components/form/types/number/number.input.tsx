import { Form } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledNumberInput } from '../../../styled/number.input'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('number.input')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function NumberInput ({
  field,
  design,
  urlValue,
  focus,
}) {
  const { t } = useTranslation()

  let initialValue: number = undefined

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
          { type: 'number', message: t('validation:invalidNumber') },
          { required: field.required, message: t('validation:valueRequired') },
        ]}
        initialValue={initialValue}
      >
        <StyledNumberInput autoFocus={focus} design={design} size={'large'} />
      </Form.Item>
    </div>
  )
}
