import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class RadioType extends AbstractType<string> {
  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./radio.admin').then(c => c.RadioAdmin));
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return dynamic(() => import('./radio.input').then(c => c.builder(this)));
  }
}
