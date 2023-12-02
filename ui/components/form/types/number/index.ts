import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class NumberType extends AbstractType<number> {
  parseUrlValue(raw: string): number {
    return parseFloat(raw)
  }

  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./number.admin').then(c => c.NumberAdmin));
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return dynamic(() => import('./number.input').then(c => c.builder(this)));
  }
}
