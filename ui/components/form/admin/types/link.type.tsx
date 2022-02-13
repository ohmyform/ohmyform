import { Form, Input } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFieldTypeProps } from './type.props'

export const LinkType: React.FC<AdminFieldTypeProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:link.default')}
        name={[props.field.name as string, 'value']}
        rules={[{ type: 'url', message: t('validation:invalidUrl') }]}
        labelCol={{ span: 6 }}
      >
        <Input type={'url'} />
      </Form.Item>
    </div>
  )
}
