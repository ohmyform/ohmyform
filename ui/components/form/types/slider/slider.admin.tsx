import { Form, InputNumber, Slider } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldAdminProps } from '../field.admin.props'

export const SliderAdmin: React.FC<FieldAdminProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item shouldUpdate noStyle>
        {(form) => {
          //const prefix = React.useContext(FormItemContext).prefixName
          const prefix = (form as any).prefixName

          const getValue = (name, defaultValue: number): number => {
            const current: unknown = form.getFieldValue([
              ...prefix,
              props.field.name as string,
              'optionKeys',
              name,
            ])

            if (!current) {
              return defaultValue
            }

            return parseFloat(current as string)
          }

          const max = getValue('max', 100)
          const min = getValue('min', 0)
          const step = getValue('step', 1)

          return (
            <Form.Item
              label={t('type:slider.default')}
              name={[props.field.name as string, 'defaultValue']}
              labelCol={{ span: 6 }}
              getValueProps={(value: string) => ({ value: value ? parseFloat(value) : undefined })}
            >
              <Slider min={min} max={max} step={step} dots={(max - min) / step <= 10} />
            </Form.Item>
          )
        }}
      </Form.Item>

      <Form.Item
        label={t('type:slider.min')}
        name={[
          props.field.name as string,
          'optionKeys',
          'min',
        ]}
        labelCol={{ span: 6 }}
        initialValue={0}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label={t('type:slider.max')}
        name={[
          props.field.name as string,
          'optionKeys',
          'max',
        ]}
        labelCol={{ span: 6 }}
        initialValue={100}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label={t('type:slider.step')}
        name={[
          props.field.name as string,
          'optionKeys',
          'step',
        ]}
        labelCol={{ span: 6 }}
        initialValue={1}
      >
        <InputNumber />
      </Form.Item>
    </div>
  )
}
