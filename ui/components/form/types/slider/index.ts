import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class SliderType extends AbstractType<number> {
  parseUrlValue(raw: string): number {
    return parseFloat(raw)
  }

  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./slider.admin').then(c => c.SliderAdmin));
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return dynamic(() => import('./slider.input').then(c => c.builder(this)));
  }
}
