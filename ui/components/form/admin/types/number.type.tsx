import { Form, InputNumber } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFieldTypeProps } from './type.props'

export const NumberType: React.FC<AdminFieldTypeProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:number:default')}
        name={[props.field.name as string, 'value']}
        labelCol={{ span: 6 }}
        getValueFromEvent={(value: number) =>
          typeof value === 'number' ? value.toFixed(2) : value
        }
        getValueProps={(value: string) => ({ value: value ? parseFloat(value) : undefined })}
      >
        <InputNumber precision={2} />
      </Form.Item>
    </div>
  )
}
