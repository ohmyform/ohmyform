import { Form } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import debug from 'debug'
import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledDateInput } from '../../../styled/date.input'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('date.input')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function DateInput ({
  field,
  design,
  urlValue,
  focus,
}) {
  const [min, setMin] = useState<Dayjs>()
  const [max, setMax] = useState<Dayjs>()
  const { t } = useTranslation()

  useEffect(() => {
    field.options.forEach((option) => {
      if (option.key === 'min') {
        setMin(dayjs(option.value))
      }
      if (option.key === 'max') {
        setMax(dayjs(option.value))
      }
    })
  }, [field])

  let initialValue: Moment = undefined

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

  return (
    <div>
      <Form.Item
        name={[field.id]}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        getValueFromEvent={(e: Moment) => e.format('YYYY-MM-DD')}
        getValueProps={(e: string) => ({ value: e ? moment(e) : undefined })}
        initialValue={initialValue}
      >
        <StyledDateInput
          autoFocus={focus}
          size={'large'}
          design={design}
          disabledDate={(d: Moment) => {
            if (min && min.isAfter(d.toDate())) {
              return true
            }

            if (max && max.isBefore(d.toDate())) {
              return true
            }

            return false
          }}
        />
      </Form.Item>
    </div>
  )
}
