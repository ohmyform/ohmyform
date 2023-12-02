import { Form, InputNumber } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldAdminProps } from '../field.admin.props'

export const NumberAdmin: React.FC<FieldAdminProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:number:default')}
        name={[props.field.name as string, 'defaultValue']}
        labelCol={{ span: 6 }}
      >
        <InputNumber precision={2} />
      </Form.Item>
    </div>
  )
}
