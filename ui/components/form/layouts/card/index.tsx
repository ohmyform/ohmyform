import { Card, Form, message, Modal, Spin } from 'antd'
import debug from 'debug'
import { darken, lighten } from 'polished'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Omf } from '../../../omf'
import { StyledButton } from '../../../styled/button'
import { useMath } from '../../../use.math'
import { fieldTypes } from '../../types'
import { LayoutProps } from '../layout.props'
import { Field } from './field'
import { Page } from './page'

type Step = 'start' | 'form' | 'end'

const logger = debug('layout/card')

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
  const [visiblity, setVisibility] = useState({})

  const { design, startPage, endPage, fields } = props.form
  const { setField } = props.submission

  const updateValues = useCallback(() => {
    const defaults = {}

    fields.forEach(field => {
      const defaultValue = field.defaultValue
        ? fieldTypes[field.type].parseValue(field.defaultValue)
        : null

      defaults[`@${field.id}`] = form.getFieldValue([field.id, 'value']) ?? defaultValue

      if (field.slug) {
        defaults[`$${field.slug}`] = form.getFieldValue([field.id, 'value']) ?? defaultValue
      }
    })

    // now calculate visibility
    const nextVisibility = {}
    fields.forEach(field => {
      if (!field.logic) return

      const logic = field.logic
        .filter(logic => logic.action === 'visible')

      if (logic.length === 0) {
        return
      }

      nextVisibility[field.id] = logic
        .map(logic => {
          try {
            const r = evaluator(
              logic.formula,
              defaults
            )

            return Boolean(r)
          } catch {
            return true
          }
        })
        .reduce<boolean>((previous, current) => previous && current, true)
    })

    // TODO improve logic of how we calculate new logic checks
    if (Object.values(nextVisibility).join(',') == Object.values(visiblity).join(',')) {
      return
    }

    setVisibility(nextVisibility)
  }, [
    fields, form, visiblity,
  ])

  useEffect(() => {
    updateValues()
  }, [updateValues])

  const finish = async (data: { [key: number]: unknown }) => {
    logger('finish form %O', data)
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
      logger('failed to finish form %O', e)
      void message.error({
        content: 'Error saving Input',
      })
    }

    setLoading(false)
  }

  console.log('render')

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
              onValuesChange={updateValues}
            >
              {fields.map((field, i) => {
                if (field.type === 'hidden') {
                  return null
                }

                if (visiblity[field.id] === false) {
                  return null
                }

                return (
                  <Field
                    key={field.id}
                    field={field}
                    design={design}
                    focus={i === 0}
                  />
                )
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
