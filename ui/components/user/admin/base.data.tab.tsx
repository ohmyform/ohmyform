import { Form, Input, Select, Tabs } from 'antd'
import { TabPaneProps } from 'antd/lib/tabs'
import React from 'react'
import { languages } from '../../../i18n'

export const BaseDataTab: React.FC<TabPaneProps> = (props) => {
  return (
    <Tabs.TabPane {...props}>
      <Form.Item
        label="Username"
        name={['user', 'username']}
        rules={[
          {
            required: true,
            message: 'Please provide a Username',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name={['user', 'email']}
        rules={[
          {
            required: true,
            message: 'Please provide an email',
          },
          {
            type: 'email',
            message: 'Must be a valid email',
          },
        ]}
      >
        <Input type={'email'} />
      </Form.Item>

      <Form.Item
        label="Role"
        name={['user', 'roles']}
        rules={[
          {
            required: true,
            message: 'Please select a role',
          },
        ]}
        getValueFromEvent={(e) => {
          switch (e) {
            case 'superuser':
              return [
                'user', 'admin', 'superuser',
              ]
            case 'admin':
              return ['user', 'admin']
            default:
              return ['user']
          }
        }}
        getValueProps={(v: string[]) => {
          let role = 'user'

          if (v && v.includes('superuser')) {
            role = 'superuser'
          } else if (v && v.includes('admin')) {
            role = 'admin'
          }

          return {
            value: role,
          }
        }}
      >
        <Select>
          {[
            'user', 'admin', 'superuser',
          ].map((role) => (
            <Select.Option value={role} key={role}>
              {role.toUpperCase()}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Language"
        name={['user', 'language']}
        rules={[
          {
            required: true,
            message: 'Please select a Language',
          },
        ]}
      >
        <Select>
          {languages.map((language) => (
            <Select.Option value={language} key={language}>
              {language.toUpperCase()}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="First Name" name={['user', 'firstName']}>
        <Input />
      </Form.Item>

      <Form.Item label="Last Name" name={['user', 'lastName']}>
        <Input />
      </Form.Item>
    </Tabs.TabPane>
  )
}
