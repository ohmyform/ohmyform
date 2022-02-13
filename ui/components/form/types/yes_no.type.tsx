import { Form, Switch } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldTypeProps } from './type.props'

export const YesNoType: React.FC<FieldTypeProps> = ({ field, urlValue }) => {
  const { t } = useTranslation()

  let initialValue = !!field.value

  if (urlValue !== undefined) {
    initialValue = !!urlValue
  }

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
        valuePropName={'checked'}
        getValueFromEvent={(checked: boolean) => (checked ? '1' : '')}
        getValueProps={(e: string) => ({ checked: !!e })}
      >
        <Switch />
      </Form.Item>
    </div>
  )
}
