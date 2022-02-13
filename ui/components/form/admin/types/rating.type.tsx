import { Form, Rate } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFieldTypeProps } from './type.props'

export const RatingType: React.FC<AdminFieldTypeProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:rating:default')}
        name={[props.field.name as string, 'value']}
        labelCol={{ span: 6 }}
        extra={t('type:rating.clearNote')}
        getValueFromEvent={(value: number) =>
          typeof value === 'number' ? value.toFixed(2) : value
        }
        getValueProps={(value: string) => ({ value: value ? parseFloat(value) : undefined })}
      >
        <Rate allowHalf allowClear />
      </Form.Item>
    </div>
  )
}
