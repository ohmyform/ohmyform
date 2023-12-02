import { Form, Select } from 'antd'
import debug from 'debug'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledSelect } from '../../../styled/select'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('field/dropdown')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function DateInput ({
  field,
  design,
  urlValue,
  focus,
}) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  let initialValue = null

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
        initialValue={initialValue}
      >
        <StyledSelect
          autoFocus={focus}
          design={design}
          open={open}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onSelect={() => setOpen(false)}
        >
          {field.options
            .filter((option) => option.key === null)
            .map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.title || option.value}
              </Select.Option>
            ))}
        </StyledSelect>
      </Form.Item>
    </div>
  )
}
