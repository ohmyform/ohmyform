import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AuthFooter } from 'components/auth/footer'
import { AuthLayout } from 'components/auth/layout'
import { setAuth } from 'components/with.auth'
import { RegisterUserData, useRegisterMutation } from 'graphql/mutation/register.mutation'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LogoWhitePng from '../assets/images/logo_white.png'
import { ErrorPage } from '../components/error.page'
import { Omf } from '../components/omf'
import { useSettingsQuery } from '../graphql/query/settings.query'
import scss from './register.module.scss'

const Register: NextPage = () => {
  const { t } = useTranslation()
  const [form] = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { data } = useSettingsQuery()

  const [register] = useRegisterMutation()

  const finish = async (data: RegisterUserData) => {
    setLoading(true)

    try {
      const result = await register({
        variables: {
          user: data,
        },
      })

      setAuth(result.data.tokens.access, result.data.tokens.refresh)

      await message.success(t('register:welcome'))

      await router.push('/')
    } catch (e) {
      await message.error(t('register:credentialsAlreadyInUse'))
      setLoading(false)
    }
  }

  const failed = async () => {
    await message.error(t('validation:mandatoryFieldsMissing'))
  }

  if (data && data.disabledSignUp.value) {
    return <ErrorPage />
  }

  return (
    <AuthLayout loading={loading}>
      <Omf />
      <Form
        form={form}
        name="login"
        onFinish={finish}
        onFinishFailed={failed}
        style={{
          margin: 'auto',
          maxWidth: '95%',
          width: 400,
        }}
      >
        <div
          style={{
            display: 'block',
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 16,
          }}
        >
          <Image
            src={LogoWhitePng.src}
            alt={'OhMyForm'}
            width={1608 / 4}
            height={530 / 4}
          />
        </div>

        <Form.Item
          name="username"
          rules={[{ required: true, message: t('validation:usernameRequired') }]}
        >
          <Input size="large" placeholder={t('login:usernamePlaceholder')} />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: t('validation:emailRequired') },
            { type: 'email', message: t('validation:invalidEmail') },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: t('validation:passwordRequired') },
            { min: 5, message: t('validation:passwordMinLength') },
          ]}
        >
          <Input.Password size="large" placeholder={t('login:passwordPlaceholder')} />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" block>
            {t('register:registerNow')}
          </Button>
        </Form.Item>

        <Button.Group className={scss.otherActions}>
          <Link href={'/login'}>
            <Button
              type={'link'}
              ghost
              style={{
                color: '#FFF',
              }}
            >
              {t('register:gotoLogin')}
            </Button>
          </Link>
        </Button.Group>
      </Form>

      <AuthFooter />
    </AuthLayout>
  )
}

export default Register
