import { Form, InputNumber, Slider } from 'antd'
import FormItemContext from 'rc-field-form/lib/FieldContext'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFieldTypeProps } from './type.props'

export const SliderType: React.FC<AdminFieldTypeProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item shouldUpdate noStyle>
        {(form) => {
          const context = React.useContext(FormItemContext)

          const getValue = (name, defaultValue: number): number => {
            const current: unknown = form.getFieldValue([
              ...context.prefixName,
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
              name={[props.field.name as string, 'value']}
              labelCol={{ span: 6 }}
              getValueFromEvent={(value: number) =>
                typeof value === 'number' ? value.toFixed(2) : value
              }
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
props.field.name as string, 'optionKeys', 'min',
        ]}
        labelCol={{ span: 6 }}
        initialValue={0}
        getValueFromEvent={(value: number) =>
          typeof value === 'number' ? value.toFixed(2) : value
        }
        getValueProps={(e: string) => ({ value: e ? parseFloat(e) : undefined })}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label={t('type:slider.max')}
        name={[
props.field.name as string, 'optionKeys', 'max',
        ]}
        labelCol={{ span: 6 }}
        initialValue={100}
        getValueFromEvent={(value: number) =>
          typeof value === 'number' ? value.toFixed(2) : value
        }
        getValueProps={(e: string) => ({ value: e ? parseFloat(e) : undefined })}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label={t('type:slider.step')}
        name={[
props.field.name as string, 'optionKeys', 'step',
        ]}
        labelCol={{ span: 6 }}
        initialValue={1}
        getValueFromEvent={(value: number) =>
          typeof value === 'number' ? value.toFixed(2) : value
        }
        getValueProps={(e: string) => ({ value: e ? parseFloat(e) : undefined })}
      >
        <InputNumber />
      </Form.Item>
    </div>
  )
}
