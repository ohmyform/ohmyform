import { Form } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledNumberInput } from '../../styled/number.input'
import { FieldTypeProps } from './type.props'

export const NumberType: React.FC<FieldTypeProps> = ({ field, design, urlValue, focus }) => {
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
