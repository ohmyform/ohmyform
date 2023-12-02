import { PlusOutlined } from '@ant-design/icons/lib'
import { Button, Form, Select, Space, Tabs } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { TabPaneProps } from 'antd/lib/tabs'
import debug from 'debug'
import { FieldData } from 'rc-field-form/lib/interface'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormFieldFragment } from '../../../graphql/fragment/form.fragment'
import { fieldTypes } from '../types'
import { FieldCard } from './field.card'

const logger = debug('FieldsTab')

interface Props extends TabPaneProps {
  form: FormInstance
  fields: FormFieldFragment[]
  onChangeFields: (fields: FormFieldFragment[]) => void
}

export const FieldsTab: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const [nextType, setNextType] = useState('textfield')

  const renderType = useCallback(
    (
      field: FieldData,
      index: number,
      remove: (index: number) => void,
      move: (from: number, to: number) => void
    ) => {
      return (
        <FieldCard
          form={props.form}
          field={field}
          index={index}
          remove={(index: number) => {
            logger('remove %d', index)
            remove(index)
          }}
          move={(from: number, to: number) => {
            logger('move %d TO %d', from, to)
            move(from, to)
          }}
          fields={props.fields}
          onChangeFields={props.onChangeFields}
        />
      )
    },
    [props.fields]
  )

  const addField = useCallback(
    (add: (defaults: unknown) => void, index: number) => {
      return (
        <Form.Item wrapperCol={{ span: 24 }}>
          <Space
            style={{
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Select value={nextType} onChange={(e) => setNextType(e)} style={{ minWidth: 200 }}>
              {Object.keys(fieldTypes).map((type) => (
                <Select.Option value={type} key={type}>
                  {t(`type:${type}.name`)}
                </Select.Option>
              ))}
            </Select>
            <Button
              type="dashed"
              onClick={() => {
                const defaults: FormFieldFragment = {
                  logic: [],
                  options: [],
                  id: `NEW-${Date.now()}`,
                  type: nextType,
                  title: '',
                  description: '',
                  required: false,
                }

                add(defaults)
                const next = [...props.fields]
                next.splice(index, 0, defaults)
                props.onChangeFields(next)
              }}
            >
              <PlusOutlined /> {t('type:add')}
            </Button>
          </Space>
        </Form.Item>
      )
    },
    [props.fields, nextType]
  )

  return (
    <Tabs.TabPane {...props}>
      <Form.List name={['form', 'fields']}>
        {(fields, { add, remove, move }) => {
          const addAndMove = (index: number) => (defaults) => {
            add(defaults)
            move(fields.length, index)
          }

          return (
            <div>
              {addField(addAndMove(0), 0)}
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    {renderType(field, index, remove, move)}
                  </Form.Item>
                  {addField(addAndMove(index + 1), index + 1)}
                </div>
              ))}
            </div>
          )
        }}
      </Form.List>
    </Tabs.TabPane>
  )
}
