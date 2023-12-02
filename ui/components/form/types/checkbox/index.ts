import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class CheckboxType extends AbstractType<string> {
  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./checkbox.admin').then(c => c.CheckboxAdmin));
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return dynamic(() => import('./checkbox.input').then(c => c.builder(this)));
  }
}
