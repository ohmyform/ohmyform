import { Card, Form, message, Modal, Spin } from 'antd'
import { darken, lighten } from 'polished'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FormPublicFieldFragment } from '../../../../graphql/fragment/form.public.fragment'
import { Omf } from '../../../omf'
import { StyledButton } from '../../../styled/button'
import { useMath } from '../../../use.math'
import { LayoutProps } from '../layout.props'
import { Field } from './field'
import { Page } from './page'

type Step = 'start' | 'form' | 'end'

const MyCard = styled.div<{ background: string }>`
  background: ${(props) => darken(0.1, props.background)};
  height: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);

  padding: 32px;

  .ant-card {
    background: ${(props) => props.background};
    border-color: ${(props) => lighten(0.4, props.background)};
    width: 800px;
    margin: auto;
    max-width: 90%;
  }
`

export const CardLayout: React.FC<LayoutProps> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<Step>(props.form.startPage.show ? 'start' : 'form')
  const evaluator = useMath()
  const [values, setValues] = useState({})

  const { design, startPage, endPage, fields } = props.form
  const { setField } = props.submission

  const finish = async (data: { [key: number]: unknown }) => {
    console.log('data', data)
    setLoading(true)

    try {
      // save fields
      await Promise.all(Object.keys(data).map((fieldId) => setField(fieldId, data[fieldId])))

      await props.submission.finish()

      if (endPage.show) {
        setStep('end')
      } else {
        Modal.success({
          content: t('form:submitted'),
          okText: t('from:restart'),
          onOk: () => {
            window.location.reload()
          },
        })
      }
    } catch (e) {
      console.error(e)
      void message.error({
        content: 'Error saving Input',
      })
    }

    setLoading(false)
  }

  const isVisible = useCallback((field: FormPublicFieldFragment): boolean => {
    if (!field.logic) return true

    console.log('DEFAULTS', values)

    return field.logic
      .filter(logic => logic.action === 'visible')
      .map(logic => {
        try {
          const r = evaluator(
            logic.formula,
            values
          )

          console.log('result', r)
          return Boolean(r)
        } catch {
          return true
        }
      })
      .reduce<boolean>((previous, current) => previous && current, true)
  }, [
    fields, form, values,
  ])

  const render = () => {
    switch (step) {
      case 'start':
        return <Page page={startPage} design={design} next={() => setStep('form')} />

      case 'form':
        return (
          <Card>
            <Form
              form={form}
              onFinish={finish}
              onValuesChange={() => {
                const defaults = {}

                fields.forEach(field => {
                  defaults[`@${field.id}`] = form.getFieldValue([field.id, 'value'])

                  if (field.slug) {
                    defaults[`$${field.slug}`] = form.getFieldValue([field.id, 'value'])
                  }
                })

                setValues(defaults)
              }}
            >
              {fields.map((field, i) => {
                if (field.type === 'hidden') {
                  return null
                }

                if (!isVisible(field)) {
                  return null
                }

                return <Field key={field.id} field={field} design={design} focus={i === 0} />
              })}
              <div
                style={{
                  padding: 32,
                  display: 'flex',
                }}
              >
                {startPage.show && (
                  <StyledButton
                    background={design.colors.button}
                    color={design.colors.buttonText}
                    highlight={design.colors.buttonActive}
                    onClick={() => setStep('start')}
                  >
                    {t('form:previous')}
                  </StyledButton>
                )}

                <div style={{ flex: 1 }} />

                <StyledButton
                  background={design.colors.button}
                  color={design.colors.buttonText}
                  highlight={design.colors.buttonActive}
                  size={'large'}
                  onClick={form.submit}
                >
                  {t('form:next')}
                </StyledButton>
              </div>
            </Form>
          </Card>
        )

      case 'end':
        return (
          <Page
            page={endPage}
            design={design}
            next={() => {
              window.location.reload()
            }}
          />
        )
    }
  }

  return (
    <MyCard background={design.colors.background}>
      <Omf />

      <Spin spinning={loading}>{render()}</Spin>
    </MyCard>
  )
}
