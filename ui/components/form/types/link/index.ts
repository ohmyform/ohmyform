import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class LinkType extends AbstractType<string> {
  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./link.admin').then(c => c.LinkAdmin));
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return dynamic(() => import('./link.input').then(c => c.builder(this)));
  }
}
