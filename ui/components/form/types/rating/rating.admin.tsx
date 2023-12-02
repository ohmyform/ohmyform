import { Form, Rate } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldAdminProps } from '../field.admin.props'

export const RatingAdmin: React.FC<FieldAdminProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:rating:default')}
        name={[props.field.name as string, 'defaultValue']}
        labelCol={{ span: 6 }}
        extra={t('type:rating.clearNote')}
      >
        <Rate allowHalf allowClear />
      </Form.Item>
    </div>
  )
}
