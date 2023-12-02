import { Alert, Form, Input, InputNumber, Space } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MapContainer, TileLayer } from 'react-leaflet'
import { DraggableMarker } from '../../../map/draggable.marker'
import { FieldAdminProps } from '../field.admin.props'

export const LocationAdmin: React.FC<FieldAdminProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:location:default')}
        labelCol={{ span: 6 }}
      >
        <Space>
          <Form.Item
            name={[
              props.field.name as string,
              'defaultValue',
              'lat',
            ]}
            noStyle
          >
            <InputNumber addonAfter={'LAT'} precision={7} step={0.00001} max={90} min={-90} />
          </Form.Item>

          <Form.Item
            name={[
              props.field.name as string,
              'defaultValue',
              'lng',
            ]}
            noStyle
          >
            <InputNumber addonAfter={'LNG'} precision={7} step={0.00001} max={180} min={-180} />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item
        label={t('type:location.initialZoom')}
        name={[
          props.field.name as string,
          'optionKeys',
          'initialZoom',
        ]}
        labelCol={{ span: 6 }}
        initialValue={1}
      >
        <InputNumber precision={0} min={1} max={18} />
      </Form.Item>

      <Form.Item
        label={t('type:location.tiles')}
        name={[
          props.field.name as string,
          'optionKeys',
          'tiles',
        ]}
        labelCol={{ span: 6 }}
        initialValue={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
      >
        <Input placeholder={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
      </Form.Item>

      <Form.Item shouldUpdate>
        {(form) => {
          //const prefix = React.useContext(FormItemContext).prefixName
          const prefix = (form as any).prefixName

          const zoom = form.getFieldValue([
            ...prefix,
            props.field.name as string,
            'optionKeys',
            'initialZoom',
          ])

          const center = form.getFieldValue([
            ...prefix,
            props.field.name as string,
            'defaultValue',
          ])

          const tiles = form.getFieldValue([
            ...prefix,
            props.field.name as string,
            'optionKeys',
            'tiles',
          ])

          if (!tiles) {
            return <Alert message={'Tiles missing!'} />
          }

          return (
            <div>
              <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: 300, width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={tiles}
                />
                {center?.lat && center?.lng && (
                  <DraggableMarker
                    value={center}
                    onChange={next => {
                      form.setFields([
                        {
                          name: [
                            ...prefix,
                            props.field.name as string,
                            'defaultValue',
                            'lng',
                          ],
                          value: next.lng,
                        },
                        {
                          name: [
                            ...prefix,
                            props.field.name as string,
                            'defaultValue',
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
