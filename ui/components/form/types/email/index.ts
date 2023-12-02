import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class EmailType extends AbstractType<string> {
  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./email.admin').then(c => c.EmailAdmin));
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return dynamic(() => import('./email.input').then(c => c.builder(this)));
  }
}
