import { Form } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledDateInput } from '../../styled/date.input'
import { FieldTypeProps } from './type.props'

export const DateType: React.FC<FieldTypeProps> = ({ field, design, urlValue, focus }) => {
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

  if (field.value) {
    initialValue = moment(field.value)
  }

  if (urlValue) {
    initialValue = moment(field.value)
  }

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
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
