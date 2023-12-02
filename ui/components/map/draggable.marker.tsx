import L from 'leaflet'
import React, { FC, useMemo, useRef } from 'react'
import { Marker } from 'react-leaflet'

interface Props {
  value: { lat: number, lng: number }
  onChange: (value: { lat: number, lng: number }) => void
}

export const DraggableMarker: FC<Props> = (props) => {
  const markerRef = useRef<L.Marker>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          props.onChange(marker.getLatLng())
        }
      },
    }),
    [],
  )
  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={props.value}
      ref={markerRef}
      icon={L.icon({
        iconUrl: require('assets/images/marker-icon-2x.png'),
        iconSize: [50/2, 82/2],
        iconAnchor: [50 / 4, 82/2],
      })}
    />
  )
}
