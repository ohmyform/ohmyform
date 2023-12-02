import { Form, Input } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldAdminProps } from '../field.admin.props'

export const EmailAdmin: React.FC<FieldAdminProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:email.default')}
        name={[props.field.name as string, 'defaultValue']}
        rules={[{ type: 'email', message: t('validation:emailRequired') }]}
        labelCol={{ span: 6 }}
      >
        <Input type={'email'} />
      </Form.Item>
    </div>
  )
}
