import { Form, Slider, Spin } from 'antd'
import debug from 'debug'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('slider.input')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function SliderInput ({
  field,
  urlValue,
  focus,
}) {
  const [min, setMin] = useState<number>()
  const [max, setMax] = useState<number>()
  const [step, setStep] = useState<number>()
  const [loading, setLoading] = useState(true)

  const { t } = useTranslation()

  useEffect(() => {
    field.options.forEach((option) => {
      if (option.key === 'min') {
        try {
          setMin(JSON.parse(option.value))
        } catch (e) {
          logger('invalid min value %O', e)
        }
      }
      if (option.key === 'max') {
        try {
          setMax(JSON.parse(option.value))
        } catch (e) {
          logger('invalid max value %O', e)
        }
      }
      if (option.key === 'step') {
        try {
          setStep(JSON.parse(option.value))
        } catch (e) {
          logger('invalid step value %O', e)
        }
      }
    })

    setLoading(false)
  }, [field])

  let initialValue: number = undefined

  if (field.defaultValue) {
    try {
      initialValue = parseValue(field.defaultValue)
    } catch (e) {
      logger('invalid default value %O', e)
    }
  }

  if (urlValue) {
    initialValue = parseUrlValue(urlValue)
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
        name={[field.id]}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
      >
        <Slider
          autoFocus={focus}
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
