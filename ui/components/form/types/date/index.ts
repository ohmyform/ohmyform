import moment, { Moment } from 'moment'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class DateType extends AbstractType<Moment> {
  parseValue(raw: string): Moment {
    return moment(JSON.parse(raw))
  }

  parseUrlValue(raw: string): Moment {
    return moment(raw)
  }

  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./date.admin').then(c => c.DateAdmin));
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return dynamic(() => import('./date.input').then(c => c.builder(this)));
  }
}
