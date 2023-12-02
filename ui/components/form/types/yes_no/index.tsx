import { Tag } from 'antd'
import dynamic from 'next/dynamic'
import React, { ComponentType } from 'react'
import { AbstractType } from '../abstract.type'
import { FieldAdminProps } from '../field.admin.props'
import { FieldInputProps } from '../field.input.props'

export class YesNoType extends AbstractType<boolean> {
  parseUrlValue(raw: string): boolean {
    return !!raw
  }

  adminFormField(): ComponentType<FieldAdminProps> {
    return dynamic(() => import('./yes_no.admin').then(c => c.YesNoAdmin));
  }

  inputFormField(): ComponentType<FieldInputProps> {
    return dynamic(() => import('./yes_no.input').then(c => c.builder(this)));
  }

  stringifyValue(raw: string): string {
    if (this.parseValue(raw)) {
      return 'YES'
    } else {
      return 'NO'
    }
  }

  displayValue(raw: string): JSX.Element {
    if (this.parseValue(raw)) {
      return <Tag color={'green'}>YES</Tag>
    } else {
      return <Tag color={'red'}>NO</Tag>
    }
  }
}
