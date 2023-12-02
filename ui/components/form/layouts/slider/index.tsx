import { Modal } from 'antd'
import debug from 'debug'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SwiperClass from 'swiper'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Omf } from '../../../omf'
import { useWindowSize } from '../../../use.window.size'
import { LayoutProps } from '../layout.props'
import { Field } from './field'
import { FormPage } from './page'

const logger = debug('layout/slider')

export const SliderLayout: React.FC<LayoutProps> = (props) => {
  const { t } = useTranslation()
  const [swiper, setSwiper] = useState<SwiperClass>(null)
  const { height } = useWindowSize()
  const { design, startPage, endPage, fields } = props.form
  const { finish, setField } = props.submission

  const goNext = () => {
    if (!swiper) return

    logger('goNext')
    swiper.allowSlideNext = true
    swiper.slideNext()
    swiper.allowSlideNext = false
  }
  const goPrev = () => {
    if (!swiper) {
      return
    }

    logger('goPrevious')
    swiper.slidePrev()
  }

  const swiperConfig: SwiperProps = {
    direction: 'vertical',
    allowSlideNext: false,
    allowSlidePrev: true,
    noSwiping: true,
    updateOnWindowResize: true,
  }

  return (
    <div
      className={'swiper-container'}
      style={{
        background: design.colors.background,
      }}
    >
      <Omf />
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Swiper
        height={height}
        {...swiperConfig}
        onSwiper={next => {
          logger('setSwiper')
          setSwiper(next)
        }}
      >
        {[
          startPage.show ? (
            <SwiperSlide key={'start'}>
              <FormPage page={startPage} design={design} next={goNext} prev={goPrev} />
            </SwiperSlide>
          ) : undefined,
          ...fields
            .map((field, i) => {
              if (field.type === 'hidden') {
                return null
              }

              return (
                <SwiperSlide key={field.id}>
                  <Field
                    field={field}
                    focus={swiper?.activeIndex === (startPage.show ? 1 : 0) + i}
                    design={design}
                    save={async (values: { [key: string]: unknown }) => {
                      await setField(field.id, values[field.id])

                      if (fields.length === i + 1) {
                        await finish()
                      }
                    }}
                    next={() => {
                      if (fields.length === i + 1) {
                      // prevent going back!
                        swiper.allowSlidePrev = true

                        if (!endPage.show) {
                          Modal.success({
                            content: t('form:submitted'),
                            okText: t('from:restart'),
                            onOk: () => {
                              window.location.reload()
                            },
                          })
                        }
                      }

                      goNext()
                    }}
                    prev={goPrev}
                  />
                </SwiperSlide>
              )
            })
            .filter((e) => e !== null),
          endPage.show ? (
            <SwiperSlide key={'end'}>
              <FormPage page={endPage} design={design} next={finish} prev={goPrev} />
            </SwiperSlide>
          ) : undefined,
        ].filter((e) => !!e)}
      </Swiper>
    </div>
  )
}
