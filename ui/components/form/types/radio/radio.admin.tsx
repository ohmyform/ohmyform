import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldAdminProps } from '../field.admin.props'

export const RadioAdmin: React.FC<FieldAdminProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:radio:default')}
        name={[props.field.name as string, 'defaultValue']}
        labelCol={{ span: 6 }}
      >
        <Input />
      </Form.Item>

      <Form.List name={[props.field.name as string, 'options']}>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  wrapperCol={{
                    sm: { offset: index === 0 ? 0 : 6 },
                  }}
                  labelCol={{ span: 6 }}
                  label={index === 0 ? t('type:radio:options') : ''}
                  key={field.key}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={{ span: 24 }}
                        name={[field.name, 'title']}
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder={t('type:radio:titlePlaceholder')} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        wrapperCol={{ span: 24 }}
                        name={[field.name, 'value']}
                        style={{ marginBottom: 0 }}
                        rules={[{ required: true, message: t('validation:valueRequired') }]}
                      >
                        <Input placeholder={t('type:radio:valuePlaceholder')} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button danger onClick={() => remove(index)}>
                        {t('type:radio:removeOption')}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              ))}

              <Form.Item
                wrapperCol={{
                  sm: { offset: 6 },
                }}
                labelCol={{ span: 6 }}
              >
                <Button type={'dashed'} onClick={() => add()}>
                  {t('type:radio:addOption')}
                </Button>
              </Form.Item>
            </div>
          )
        }}
      </Form.List>
    </div>
  )
}
