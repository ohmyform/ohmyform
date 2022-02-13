import { Form } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledInput } from '../../styled/input'
import { FieldTypeProps } from './type.props'

export const TextType: React.FC<FieldTypeProps> = ({ field, design, urlValue, focus }) => {
  const { t } = useTranslation()
  // TODO focus when becomes visible

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={urlValue || field.value}
      >
        <StyledInput autoFocus={focus} design={design} allowClear size={'large'} />
      </Form.Item>
    </div>
  )
}
