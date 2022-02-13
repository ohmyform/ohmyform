import { Form, Rate } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldTypeProps } from './type.props'

export const RatingType: React.FC<FieldTypeProps> = ({ field, urlValue }) => {
  const { t } = useTranslation()

  let initialValue: number = undefined

  if (field.value) {
    initialValue = parseFloat(field.value)
  }

  if (urlValue) {
    initialValue = parseFloat(urlValue)
  }

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
      >
        <Rate allowHalf />
      </Form.Item>
    </div>
  )
}
