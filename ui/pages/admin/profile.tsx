import { Button, Divider, Form, Input, message, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Structure from '../../components/structure'
import { withAuth } from '../../components/with.auth'
import { useProfileUpdateMutation } from '../../graphql/mutation/profile.update.mutation'
import { useProfileQuery } from '../../graphql/query/admin.profile.query'
import { languages } from '../../i18n'

interface FormData {
  user: {
    id: string
    username: string
    email: string
    language: string
    firstName: string
    lastName: string
  }
  password: string
  confirm: string
}

const Profile: NextPage = () => {
  const { t } = useTranslation()
  const [form] = useForm<FormData>()
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const { loading } = useProfileQuery({
    onCompleted: (next) => {
      form.setFieldsValue(next)
    },
    onError(e) {
      void router.push('/')
    },
  })

  const [update] = useProfileUpdateMutation()

  const save = async (data: FormData) => {
    setSaving(true)

    try {
      const next = (
        await update({
          variables: {
            user: {
              ...data.user,
              password: data.password && data.password === data.confirm ? data.password : undefined,
            },
          },
        })
      ).data

      form.setFieldsValue(next)

      await message.success(t('profile:updated'))
    } catch (e) {
      console.error('failed to save', e)
      await message.error(t('profile:updateError'))
    }

    setSaving(false)
  }

  return (
    <Structure
      loading={loading || saving}
      title={t('admin:profile')}
      selected={'profile'}
      breadcrumbs={[{ href: '/admin', name: t('admin:home') }]}
      extra={[
        <Button key={'save'} onClick={form.submit} type={'primary'}>
          {t('profile:updateNow')}
        </Button>,
      ]}
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
        <Form.Item noStyle name={['user', 'id']}>
          <Input type={'hidden'} />
        </Form.Item>

        <Form.Item
          label={t('profile:username')}
          name={['user', 'username']}
          rules={[
            {
              required: true,
              message: t('validation:usernameRequired'),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('profile:email')}
          name={['user', 'email']}
          rules={[
            {
              required: true,
              message: t('validation:emailRequired'),
            },
            {
              type: 'email',
              message: t('validation:invalidEmail'),
            },
          ]}
        >
          <Input type={'email'} />
        </Form.Item>

        <Form.Item
          label={t('profile:language')}
          name={['user', 'language']}
          rules={[
            {
              required: true,
              message: t('validation:languageRequired'),
            },
          ]}
        >
          <Select>
            {languages.map((language) => (
              <Select.Option value={language} key={language}>
                {t(`language:${language}`)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={t('profile:firstName')} name={['user', 'firstName']}>
          <Input />
        </Form.Item>

        <Form.Item label={t('profile:lastName')} name={['user', 'lastName']}>
          <Input />
        </Form.Item>

        <Divider />

        <Form.Item
          name="password"
          label={t('profile:password')}
          rules={[
            {
              min: 5,
              message: t('validation:passwordMinLength'),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Form.Item
              name="confirm"
              label={t('profile:confirmPassword')}
              rules={[
                {
                  required: Boolean(form.getFieldValue('password')),
                  message: t('validation:passwordConfirmRequired'),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error(t('validation:passwordConfirmMismatch')))
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form.Item>
      </Form>
    </Structure>
  )
}

export default withAuth(Profile)
