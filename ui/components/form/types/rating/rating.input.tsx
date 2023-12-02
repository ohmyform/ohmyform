import { Form, Rate } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('rating.input')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function RatingInput ({
  field,
  urlValue,
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
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
      >
        <Rate allowHalf />
      </Form.Item>
    </div>
  )
}
