import { Form, Input } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFieldTypeProps } from './type.props'

export const TextareaType: React.FC<AdminFieldTypeProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:textarea:default')}
        name={[props.field.name as string, 'value']}
        labelCol={{ span: 6 }}
      >
        <Input.TextArea autoSize />
      </Form.Item>
    </div>
  )
}
