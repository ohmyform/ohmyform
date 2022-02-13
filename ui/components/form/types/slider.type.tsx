import { Form, Slider, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldTypeProps } from './type.props'

export const SliderType: React.FC<FieldTypeProps> = ({ field, urlValue }) => {
  const [min, setMin] = useState<number>()
  const [max, setMax] = useState<number>()
  const [step, setStep] = useState<number>()
  const [loading, setLoading] = useState(true)

  const { t } = useTranslation()

  useEffect(() => {
    field.options.forEach((option) => {
      if (option.key === 'min') {
        setMin(parseFloat(option.value))
      }
      if (option.key === 'max') {
        setMax(parseFloat(option.value))
      }
      if (option.key === 'step') {
        setStep(parseFloat(option.value))
      }
    })

    setLoading(false)
  }, [field])

  let initialValue: number = undefined

  if (field.value) {
    initialValue = parseFloat(field.value)
  }

  if (urlValue) {
    initialValue = parseFloat(urlValue)
  }

  if (loading) {
    return (
      <div>
        <Spin />
      </div>
    )
  }

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
        getValueFromEvent={(value: number) =>
          typeof value === 'number' ? value.toFixed(2) : value
        }
        getValueProps={(value: string) => ({ value: value ? parseFloat(value) : undefined })}
      >
        <Slider
          min={min}
          max={max}
          step={step}
          tooltipVisible={true}
          dots={(max - min) / step <= 10}
        />
      </Form.Item>
    </div>
  )
}
