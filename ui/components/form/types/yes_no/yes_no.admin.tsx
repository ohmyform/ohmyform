import { Form, Switch } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldAdminProps } from '../field.admin.props'

export const YesNoAdmin: React.FC<FieldAdminProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:yes_no:default')}
        name={[props.field.name as string, 'defaultValue']}
        labelCol={{ span: 6 }}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>
    </div>
  )
}
