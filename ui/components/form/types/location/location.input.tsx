import { Alert, Form, InputNumber, Space, Spin } from 'antd'
import debug from 'debug'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapContainer, TileLayer } from 'react-leaflet'
import { DraggableMarker } from '../../../map/draggable.marker'
import { FieldInputBuilderType } from '../field.input.builder.type'

const logger = debug('location.number')

export const builder: FieldInputBuilderType = ({
  parseUrlValue,
  parseValue,
}) => function LocationInput ({
  field,
  urlValue,
}) {
  const [initialZoom, setInitialZoom] = useState<number>(13)
  const [tiles, setTiles] = useState<string>()
  const [loading, setLoading] = useState(true)

  const { t } = useTranslation()


  useEffect(() => {
    field.options.forEach((option) => {
      if (option.key === 'initialZoom') {
        try {
          setInitialZoom(JSON.parse(option.value))
        } catch (e) {
          logger('invalid initialZoom value %O', e)
        }
      }

      if (option.key === 'tiles') {
        try {
          setTiles(JSON.parse(option.value))
        } catch (e) {
          logger('invalid tiles value %O', e)
        }
      }
    })

    setLoading(false)
  }, [field])

  let initialValue: { lat: number, lng: number } = undefined

  if (field.defaultValue) {
    try {
      initialValue = parseValue(field.defaultValue)
    } catch (e) {
      logger('invalid default value %O', e)
    }
  }

  if (urlValue) {
    try {
      initialValue = parseUrlValue(urlValue)
    } catch (e) {
      logger('invalid url value %O', e)
    }
  }

  if (loading) {
    return (
      <div>
        <Spin />
      </div>
    )
  }

  if (!tiles) {
    return <Alert message={'Tiles missing!'} />
  }

  return (
    <div>
      <Form.Item>
        <Space>
          <Form.Item
            rules={[{ required: field.required, message: t('validation:valueRequired') }]}
            name={[
              field.id,
              'lat',
            ]}
            initialValue={initialValue?.lat}
            noStyle
          >
            <InputNumber addonAfter={'LAT'} precision={7} step={0.00001} max={90} min={-90} />
          </Form.Item>

          <Form.Item
            rules={[{ required: field.required, message: t('validation:valueRequired') }]}
            name={[
              field.id,
              'lng',
            ]}
            initialValue={initialValue?.lng}
            noStyle
          >
            <InputNumber addonAfter={'LNG'} precision={7} step={0.00001} max={180} min={-180} />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item dependencies={[[field.id, 'lat'], [field.id, 'lng']]}>
        {(form) => {
          const center = form.getFieldValue([field.id])

          return (
            <div>
              <MapContainer
                center={initialValue}
                zoom={initialZoom}
                style={{ height: 300, width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={tiles}
                />
                {center.lat && center.lng && (
                  <DraggableMarker
                    value={center}
                    onChange={next => {
                      form.setFields([
                        {
                          name: [
                            field.id,
                            'lng',
                          ],
                          value: next.lng,
                        },
                        {
                          name: [
                            field.id,
                            'lat',
                          ],
                          value: next.lat,
                        },
                      ])
                    }}
                  />
                )}
              </MapContainer>
            </div>
          )
        }}
      </Form.Item>
    </div>
  )
}
