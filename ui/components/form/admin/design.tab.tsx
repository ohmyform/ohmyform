import { Form, Input, Select, Tabs } from 'antd'
import { TabPaneProps } from 'antd/lib/tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { InputColor } from '../../input/color'

export const DesignTab: React.FC<TabPaneProps> = (props) => {
  const { t } = useTranslation()

  return (
    <Tabs.TabPane {...props}>
      <Form.Item label={t('form:design.font')} name={[
        'form', 'design', 'font',
      ]}>
        <Input />
      </Form.Item>
      <Form.Item label={t('form:design.layouts')} name={[
        'form', 'design', 'layout',
      ]}>
        <Select
          options={[
            {
              value: null,
              label: t('form:design.layout.slider'),
            },
            {
              value: 'card',
              label: t('form:design.layout.card'),
            },
          ]}
        />
      </Form.Item>

      {[
        'background', 'question', 'answer', 'button', 'buttonActive', 'buttonText',
      ].map((name) => (
        <Form.Item
          key={name}
          label={t(`form:design.color.${name}`)}
          name={[
            'form', 'design', 'colors', name,
          ]}
        >
          <InputColor />
        </Form.Item>
      ))}
    </Tabs.TabPane>
  )
}
