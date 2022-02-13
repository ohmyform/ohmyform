import { Form, Input } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFieldTypeProps } from './type.props'

export const TextType: React.FC<AdminFieldTypeProps> = (props) => {
  const { t } = useTranslation()

  return (
    <Form.Item
      label={t('type:textfield:default')}
      name={[props.field.name as string, 'value']}
      labelCol={{ span: 6 }}
    >
      <Input />
    </Form.Item>
  )
}
