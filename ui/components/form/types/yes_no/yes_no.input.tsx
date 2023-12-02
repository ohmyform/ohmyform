import { Form, Switch } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('yes_no.input')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function YesNoInput ({
  field,
  urlValue,
}) {
  const { t } = useTranslation()


  let initialValue: boolean = undefined

  if (field.defaultValue) {
    try {
      initialValue = parseValue(field.defaultValue)
    } catch (e) {
      logger('invalid default value %O', e)
    }
  }

  if (urlValue !== undefined) {
    initialValue = parseUrlValue(urlValue)
  }

  return (
    <div>
      <Form.Item
        name={[field.id]}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>
    </div>
  )
}
