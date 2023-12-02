import { Button, Form, Input, message, Tabs } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { cleanInput } from 'components/clean.input'
import { BaseDataTab } from 'components/form/admin/base.data.tab'
import { DesignTab } from 'components/form/admin/design.tab'
import { EndPageTab } from 'components/form/admin/end.page.tab'
import { FieldsTab } from 'components/form/admin/fields.tab'
import { NotificationsTab } from 'components/form/admin/notifications.tab'
import { StartPageTab } from 'components/form/admin/start.page.tab'
import { Structure } from 'components/structure'
import { withAuth } from 'components/with.auth'
import debug from 'debug'
import { useFormUpdateMutation } from 'graphql/mutation/form.update.mutation'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HooksTab } from '../../../../components/form/admin/hooks.tab'
import {
  FormFieldFragment,
  FormFieldOptionKeysFragment,
} from '../../../../graphql/fragment/form.fragment'
import { Data, useFormQuery } from '../../../../graphql/query/form.query'

const logger = debug('page/admin/form/[id]')

const Index: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = useForm()
  const [saving, setSaving] = useState(false)
  const [fields, setFields] = useState<FormFieldFragment[]>([])
  const [update] = useFormUpdateMutation()

  const processNext = (next: Data) => {
    return {
      form: {
        ...next.form,
        fields: next.form.fields
          .map((field) => {
            const keys: FormFieldOptionKeysFragment = {}

            field.options.forEach((option) => {
              if (option.key) {
                try {
                  keys[option.key] = JSON.parse(option.value)
                } catch (e) {
                  logger('invalid option value %O', e)
                }
              }
            })

            return {
              ...field,
              defaultValue: field.defaultValue ? JSON.parse(field.defaultValue) : null,
              options: field.options.filter((option) => !option.key),
              optionKeys: keys,
            }
          })
          .sort((a, b) => a.idx - b.idx),
      },
    }
  }

  const { data, loading, error } = useFormQuery({
    variables: {
      id: router.query.id as string,
    },
    onCompleted: (next) => {
      const processed = processNext(next)
      form.setFieldsValue(processed)
      setFields(processed.form.fields)
    },
  })

  const save = async (formData: Data) => {
    setSaving(true)

    formData.form.fields = formData.form.fields
      .filter((e) => e && e.type)
      .map(({ optionKeys, ...field }, index) => {
        const options = field.options

        if (optionKeys) {
          Object.keys(optionKeys).forEach((key) => {
            if (optionKeys[key] === undefined) {
              return
            }

            options.push({
              id: null, // TODO improve this
              value: JSON.stringify(optionKeys[key]),
              key,
            })
          })
        }

        return {
          ...field,
          defaultValue: field.defaultValue !== null ? JSON.stringify(field.defaultValue) : null,
          options,
          idx: index,
        }
      })

    try {
      const next = processNext(
        (
          await update({
            variables: cleanInput(formData),
          })
        ).data
      )

      form.setFieldsValue(next)
      setFields(next.form.fields)

      await message.success(t('form:updated'))
    } catch (e) {
      console.error('failed to save', e)
      await message.error(t('form:updateError'))
    }

    setSaving(false)
  }

  if (error) {
    return (
      <Structure
        title={t('form:notFound')}
        selected={'forms'}
        breadcrumbs={[
          { href: '/admin', name: t('admin:home') },
          { href: '/admin/forms', name: t('admin:forms') },
        ]}
      >
        Not Found
      </Structure>
    )
  }

  return (
    <Structure
      loading={loading || saving}
      title={loading ? t('form:loading') : t('form:mange', { title: data.form.title })}
      selected={'forms'}
      breadcrumbs={[
        { href: '/admin', name: t('admin:home') },
        { href: '/admin/forms', name: t('admin:forms') },
      ]}
      extra={[
        <Link
          key={'submissions'}
          href={'/admin/forms/[id]/submissions'}
          as={`/admin/forms/${router.query.id as string}/submissions`}
        >
          <Button>{t('admin:submissions')}</Button>
        </Link>,
        <Button key={'save'} onClick={form.submit} type={'primary'}>
          {t('form:updateNow')}
        </Button>,
      ]}
      style={{ paddingTop: 0 }}
    >
      <Form
        form={form}
        onFinish={save}
        onFinishFailed={async () => {
          // TODO process errors
          await message.error(t('validation:mandatoryFieldsMissing'))
        }}
        labelCol={{
          xs: { span: 24 },
          sm: { span: 6 },
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 18 },
        }}
      >
        <Form.Item noStyle name={['form', 'id']}>
          <Input type={'hidden'} />
        </Form.Item>

        <Tabs>
          <FieldsTab
            key={'fields'}
            tab={t('form:fieldsTab')}
            fields={fields}
            onChangeFields={setFields}
            form={form}
          />
          <BaseDataTab key={'base_data'} tab={t('form:baseDataTab')} />
          <DesignTab key={'design'} tab={t('form:designTab')} />
          <NotificationsTab
            key={'notifications'}
            tab={t('form:notificationsTab')}
            fields={fields}
            form={form}
          />
          <StartPageTab key={'start_page'} tab={t('form:startPageTab')} />
          <EndPageTab key={'end_page'} tab={t('form:endPageTab')} />
          <HooksTab key={'hooks'} tab={t('form:hooksTab')} />
        </Tabs>
      </Form>
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
