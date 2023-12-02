import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class RatingType extends AbstractType<number> {
  parseUrlValue(raw: string): number {
    return parseFloat(raw)
  }

  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./rating.admin').then(c => c.RatingAdmin));
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return dynamic(() => import('./rating.input').then(c => c.builder(this)));
  }
}
