import { Button, Form, Input, message, Tabs } from 'antd'
import { cleanInput } from 'components/clean.input'
import { BaseDataTab } from 'components/form/admin/base.data.tab'
import Structure from 'components/structure'
import { withAuth } from 'components/with.auth'
import { FormFragment } from 'graphql/fragment/form.fragment'
import { useFormCreateMutation } from 'graphql/mutation/form.create.mutation'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface FormData {
  form: FormFragment
}

const Create: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = Form.useForm<FormData>()
  const [saving, setSaving] = useState(false)
  const [create] = useFormCreateMutation()

  const save = async (formData: FormData) => {
    setSaving(true)

    try {
      const next = (
        await create({
          variables: cleanInput(formData),
        })
      ).data

      await message.success(t('form:created'))

      await router.replace('/admin/forms/[id]', `/admin/forms/${next.form.id}`)
    } catch (e) {
      console.error('failed to save', e)
      await message.error(t('form:creationError'))
    }

    setSaving(false)
  }

  return (
    <Structure
      loading={saving}
      title={t('form:create')}
      selected={'forms'}
      breadcrumbs={[
        { href: '/admin', name: t('admin:home') },
        { href: '/admin/forms', name: t('admin:forms') },
      ]}
      extra={[
        <Button key={'create'} onClick={form.submit} type={'primary'}>
          {t('form:createNow')}
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
          <BaseDataTab key={'base_data'} tab={t('form:baseDataTab')} />
        </Tabs>
      </Form>
    </Structure>
  )
}

export default withAuth(Create, ['admin'])
