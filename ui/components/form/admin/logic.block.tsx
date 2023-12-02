import { DeleteOutlined } from '@ant-design/icons'
import { Alert, Button, Checkbox, Form, Mentions, Popconfirm, Select } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { FieldData } from 'rc-field-form/lib/interface'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormFieldFragment } from '../../../graphql/fragment/form.fragment'
import { useMath } from '../../use.math'

interface Props {
  form: FormInstance
  fields: FormFieldFragment[]
  field: FieldData
  remove: (index: number) => void
  index: number
}

export const LogicBlock: React.FC<Props> = ({
  form,
  field,
  fields,
  remove,
  index,
}) => {
  const { t } = useTranslation()
  const evaluator = useMath()

  return (
    <div
      style={{
        borderRight: '5px solid #DDD',
        paddingRight: 10,
      }}
    >
      <Form.Item
        name={[field.name as string, 'formula']}
        labelCol={{ span: 6 }}
        label={'Formula'}
        rules={[{ required: true, message: 'combine other fields' }]}
        extra={'Save form to get new @IDs and $slugs. (example: $slug < 21 or @id = 42)'}
      >
        <Mentions rows={1}>
          {fields.map((field) => (
            <Mentions.Option key={field.id} value={field.id}>
              {field.title}
            </Mentions.Option>
          ))}
        </Mentions>
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {(form: FormInstance & { prefixName: string[] }) => {
          try {
            const defaults = {}

            fields.forEach((field) => {
              defaults[`@${field.id}`] = field.defaultValue

              if (field.slug) {
                defaults[`$${field.slug}`] = field.defaultValue
              }
            })

            const result = evaluator(
              form.getFieldValue([
                ...form.prefixName,
                field.name as string,
                'formula',
              ]),
              defaults
            )

            return (
              <Alert
                type={result ? 'success' : 'warning'}
                message={
                  result
                    ? 'would trigger action with current default values'
                    : 'would NOT trigger action with current default values'
                }
                style={{ marginBottom: 24 }}
              />
            )
          } catch (e) {
            return (
              <Alert
                message={(e as Error).message || 'Failed to process formula'}
                type={'error'}
                style={{ marginBottom: 24 }}
              />
            )
          }
        }}
      </Form.Item>
      <Form.Item name={[field.name as string, 'action']} labelCol={{ span: 6 }} label={'Action'}>
        <Select
          options={[
            {
              value: 'jumpTo',
              label: t('form:logic.action.jumpTo'),
            },
            {
              value: 'visible',
              label: t('form:logic.action.visible'),
            },
            {
              value: 'disable',
              label: t('form:logic.action.disable'),
            },
            {
              value: 'require',
              label: t('form:logic.action.require'),
            },
          ]}
        />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {(form: FormInstance & { prefixName: string[] }) => {
          return (
            <Form.Item
              hidden={
                form.getFieldValue([
                  ...form.prefixName, field.name as string, 'action',
                ]) !==
                'jumpTo'
              }
              labelCol={{ span: 6 }}
              label={t('form:logic.action.jumpTo')}
              rules={[{ required: true, message: 'Jump target is required' }]}
              extra={'after selecting field (works best with clickable values)'}
            >
              <Select
                options={fields
                  .filter((field) => !/NEW/i.test(field.id))
                  .map((field) => ({
                    value: field.id,
                    label: field.title,
                  }))}
              />
            </Form.Item>
          )
        }}
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {(form: FormInstance & { prefixName: string[] }) => {
          return (
            <Form.Item
              hidden={
                form.getFieldValue([
                  ...form.prefixName, field.name as string, 'action',
                ]) !==
                'visible'
              }
              initialValue={true}
              labelCol={{ span: 6 }}
              label={t('form:logic.action.visible')}
              valuePropName={'checked'}
              getValueFromEvent={(checked: boolean) => (checked ? '1' : '')}
              getValueProps={(e: string) => ({ checked: !!e })}
            >
              <Checkbox />
            </Form.Item>
          )
        }}
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {(form: FormInstance & { prefixName: string[] }) => {
          return (
            <Form.Item
              hidden={
                form.getFieldValue([
                  ...form.prefixName, field.name as string, 'action',
                ]) !==
                'disable'
              }
              initialValue={false}
              labelCol={{ span: 6 }}
              label={t('form:logic.action.disable')}
              valuePropName={'checked'}
              getValueFromEvent={(checked: boolean) => (checked ? '1' : '')}
              getValueProps={(e: string) => ({ checked: !!e })}
            >
              <Checkbox />
            </Form.Item>
          )
        }}
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {(form: FormInstance & { prefixName: string[] }) => {
          return (
            <Form.Item
              hidden={
                form.getFieldValue([
                  ...form.prefixName, field.name as string, 'action',
                ]) !==
                'require'
              }
              initialValue={true}
              labelCol={{ span: 6 }}
              label={t('form:logic.action.require')}
              valuePropName={'checked'}
              getValueFromEvent={(checked: boolean) => (checked ? '1' : '')}
              getValueProps={(e: string) => ({ checked: !!e })}
            >
              <Checkbox />
            </Form.Item>
          )
        }}
      </Form.Item>

      <Form.Item>
        <div style={{ textAlign: 'right' }}>
          <Popconfirm
            placement={'right'}
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
      </Form.Item>
    </div>
  )
}
