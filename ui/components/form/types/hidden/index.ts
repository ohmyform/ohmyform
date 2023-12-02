import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class HiddenType extends AbstractType<string> {
  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./hidden.admin').then(c => c.HiddenAdmin));
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return null;
  }
}
