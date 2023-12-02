import { Form, Radio } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledRadio } from '../../../styled/radio'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('radio.input')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function RadioInput ({
  field,
  design,
  urlValue,
}) {
  const { t } = useTranslation()

  let initialValue: string = undefined

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
        initialValue={field.options
          .map((option) => option.value)
          .find((value) => value === initialValue)}
      >
        <Radio.Group>
          {field.options
            .filter((option) => option.key === null)
            .map((option) => (
              <StyledRadio design={design} value={option.value} key={option.value}>
                {option.title || option.value}
              </StyledRadio>
            ))}
        </Radio.Group>
      </Form.Item>
    </div>
  )
}
