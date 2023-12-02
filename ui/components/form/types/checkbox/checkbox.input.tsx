import { Checkbox, Form } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledCheckbox } from '../../../styled/checkbox'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('checkbox.input')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function CheckboxInput ({
  field,
  design,
  urlValue,
  focus,
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
        <Checkbox.Group>
          {field.options
            .filter((option) => option.key === null)
            .map((option, i) => (
              <StyledCheckbox
                design={design}
                value={option.value}
                key={option.value}
                autoFocus={i === 0 && focus}
              >
                {option.title || option.value}
              </StyledCheckbox>
            ))}
        </Checkbox.Group>
      </Form.Item>
    </div>
  )
}
