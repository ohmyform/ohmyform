import { Form, Radio } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledRadio } from '../../styled/radio'
import { FieldTypeProps } from './type.props'

export const RadioType: React.FC<FieldTypeProps> = ({ field, design, urlValue }) => {
  const { t } = useTranslation()

  let initialValue: string = undefined

  if (field.value) {
    initialValue = field.value
  }

  if (urlValue) {
    initialValue = urlValue
  }

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={field.options
          .map((option) => option.value)
          .find((value) => value === initialValue)}
      >
        <Radio.Group>
          {field.options
            .filter((option) => option.key === null)
            .map((option) => (
              <StyledRadio design={design} value={option.value} key={option.value}>
                {option.title || option.value}
              </StyledRadio>
            ))}
        </Radio.Group>
      </Form.Item>
    </div>
  )
}
