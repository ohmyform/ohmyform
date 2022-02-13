import { PlusOutlined } from '@ant-design/icons/lib'
import { Button, Form, Space, Tabs } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { TabPaneProps } from 'antd/lib/tabs'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FormFieldFragment,
  FormNotificationFragment,
} from '../../../graphql/fragment/form.fragment'
import { NotificationCard } from './notification.card'

interface Props extends TabPaneProps {
  form: FormInstance
  fields: FormFieldFragment[]
}

export const NotificationsTab: React.FC<Props> = (props) => {
  const { t } = useTranslation()

  const groups: {
    [key: string]: FormFieldFragment[]
  } = {}
  props.fields.forEach((field) => {
    if (!groups[field.type]) {
      groups[field.type] = []
    }
    groups[field.type].push(field)
  })

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
            <Button
              type="dashed"
              onClick={() => {
                const defaults: FormNotificationFragment = {
                  id: Math.random().toString(),
                  enabled: false,
                }

                add(defaults)
              }}
            >
              <PlusOutlined /> {t('form:notifications.add')}
            </Button>
          </Space>
        </Form.Item>
      )
    },
    [props.fields]
  )

  return (
    <Tabs.TabPane {...props}>
      <Form.List name={['form', 'notifications']}>
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
                    <NotificationCard
                      form={props.form}
                      field={field}
                      index={index}
                      remove={remove}
                      groups={groups}
                    />
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
