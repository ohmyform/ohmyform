import { Form, Input } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFieldTypeProps } from './type.props'

export const EmailType: React.FC<AdminFieldTypeProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:email.default')}
        name={[props.field.name as string, 'value']}
        rules={[{ type: 'email', message: t('validation:emailRequired') }]}
        labelCol={{ span: 6 }}
      >
        <Input type={'email'} />
      </Form.Item>
    </div>
  )
}
