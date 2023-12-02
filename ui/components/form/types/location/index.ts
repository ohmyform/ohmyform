import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class LocationType extends AbstractType<{ lat: number, lng: number }> {
  parseUrlValue(raw: string): { lat: number; lng: number } {
    if (raw.includes(',')) {
      const [lat, lng] = raw.split(',')

      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      }
    }

    throw new Error('no separator found')
  }

  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./location.admin').then(c => c.LocationAdmin), { ssr: false });
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return dynamic(() => import('./location.input').then(c => c.builder(this)), { ssr: false });
  }

  stringifyValue(raw: string): string {
    const data = this.parseValue(raw)

    return `${data.lat}, ${data.lng}`
  }
}
