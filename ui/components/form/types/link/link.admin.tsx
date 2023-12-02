import { Form, Input } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldAdminProps } from '../field.admin.props'

export const LinkAdmin: React.FC<FieldAdminProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:link.default')}
        name={[props.field.name as string, 'defaultValue']}
        rules={[{ type: 'url', message: t('validation:invalidUrl') }]}
        labelCol={{ span: 6 }}
      >
        <Input type={'url'} />
      </Form.Item>
    </div>
  )
}
