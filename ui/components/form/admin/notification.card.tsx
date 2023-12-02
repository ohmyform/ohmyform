import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons/lib'
import { Button, Card, Form, Input, Popconfirm, Select, Switch } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { FieldData } from 'rc-field-form/lib/interface'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FormFieldFragment } from '../../../graphql/fragment/form.fragment'

interface Props {
  form: FormInstance
  field: FieldData
  groups: {
    [key: string]: FormFieldFragment[]
  }
  remove: (index: number) => void
  index: number
}

export const NotificationCard: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const { form, field, remove, index, groups } = props

  const [enabled, setEnabled] = useState<boolean>()

  return (
    <Card
      title={'Notification'}
      type={'inner'}
      extra={
        <div>
          <Popconfirm
            placement={'left'}
            title={t('type:confirmDelete')}
            okText={t('type:deleteNow')}
            okButtonProps={{ danger: true }}
            onConfirm={() => {
              remove(index)
            }}
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      }
      actions={[<DeleteOutlined key={'delete'} onClick={() => remove(index)} />]}
    >
      <Form.Item
        label={t('form:notifications.enabled')}
        name={[field.name as string, 'enabled']}
        valuePropName={'checked'}
        labelCol={{ span: 6 }}
      >
        <Switch onChange={(e) => setEnabled(e.valueOf())} />
      </Form.Item>

      <Form.Item shouldUpdate noStyle>
        {() => (
          <Form.Item
            label={t('form:notifications.subject')}
            name={[field.name as string, 'subject']}
            rules={[
              {
                required: Boolean(
                  form.getFieldValue([
                    'form', 'notifications', field.name as string, 'enabled',
                  ])
                ),
                message: t('validation:subjectRequired'),
              },
            ]}
            labelCol={{ span: 6 }}
          >
            <Input />
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item shouldUpdate noStyle>
        {() => (
          <Form.Item
            label={t('form:notifications.htmlTemplate')}
            name={[field.name as string, 'htmlTemplate']}
            rules={[
              {
                required: Boolean(
                  form.getFieldValue([
                    'form', 'notifications', field.name as string, 'enabled',
                  ])
                ),
                message: t('validation:templateRequired'),
              },
            ]}
            extra={
              <div>
                <Trans>form:notifications.htmlTemplateInfo</Trans>
                <a
                  href={'https://mjml.io/try-it-live'}
                  target={'_blank'}
                  rel={'noreferrer'}
                  style={{
                    marginLeft: 16,
                  }}
                >
                  <InfoCircleOutlined />
                </a>
              </div>
            }
            labelCol={{ span: 6 }}
          >
            <Input.TextArea autoSize />
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item shouldUpdate noStyle>
        {() => (
          <Form.Item
            label={t('form:notifications.fromField')}
            name={[field.name as string, 'fromField']}
            extra={t('form:notifications.fromFieldInfo')}
            labelCol={{ span: 6 }}
            rules={[
              {
                required: Boolean(
                  form.getFieldValue([
                    'form', 'notifications', field.name as string, 'enabled',
                  ]) &&
                    !form.getFieldValue([
                      'form',
                      'notifications',
                      field.name as string,
                      'fromEmail',
                    ])
                ),
                message: t('validation:emailFieldRequired'),
              },
            ]}
          >
            <Select>
              {Object.keys(groups).map((key) => (
                <Select.OptGroup label={key.toUpperCase()} key={key}>
                  {groups[key].map((element) => (
                    <Select.Option value={element.id} key={element.id}>
                      {element.title}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item shouldUpdate noStyle>
        {() => (
          <Form.Item
            label={t('form:notifications.fromEmail')}
            name={[field.name as string, 'fromEmail']}
            extra={t('form:notifications.fromEmailInfo')}
            labelCol={{ span: 6 }}
            rules={[
              {
                required: Boolean(
                  form.getFieldValue([
                    'form', 'notifications', field.name as string, 'enabled',
                  ]) &&
                    !form.getFieldValue([
                      'form',
                      'notifications',
                      field.name as string,
                      'fromField',
                    ])
                ),
                message: t('validation:emailFieldRequired'),
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item shouldUpdate noStyle>
        {() => (
          <Form.Item
            label={t('form:notifications.toField')}
            name={[field.name as string, 'toField']}
            extra={t('form:notifications.toFieldInfo')}
            rules={[
              {
                required: Boolean(
                  form.getFieldValue([
                    'form', 'notifications', field.name as string, 'enabled',
                  ]) &&
                    !form.getFieldValue([
                      'form', 'notifications', field.name as string, 'toEmail',
                    ])
                ),
                message: t('validation:emailFieldRequired'),
              },
            ]}
            labelCol={{ span: 6 }}
          >
            <Select>
              {Object.keys(groups).map((key) => (
                <Select.OptGroup label={key.toUpperCase()} key={key}>
                  {groups[key].map((field) => (
                    <Select.Option value={field.id} key={field.id}>
                      {field.title}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item shouldUpdate noStyle>
        {() => (
          <Form.Item
            label={t('form:notifications.toEmail')}
            name={[field.name as string, 'toEmail']}
            extra={t('form:notifications.toEmailInfo')}
            labelCol={{ span: 6 }}
            rules={[
              {
                required: Boolean(
                  form.getFieldValue([
                    'form', 'notifications', field.name as string, 'enabled',
                  ]) &&
                    !form.getFieldValue([
                      'form', 'notifications', field.name as string, 'toField',
                    ])
                ),
                message: t('validation:emailFieldRequired'),
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
      </Form.Item>
    </Card>
  )
}
