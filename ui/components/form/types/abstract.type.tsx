import React, { ComponentType } from 'react'
import { FieldAdminProps } from './field.admin.props'
import { FieldInputProps } from './field.input.props'

export abstract class AbstractType<A = any> {
  public parseValue(raw: string): A {
    return JSON.parse(raw) as A
  }

  public parseUrlValue(raw: string): A {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return raw as any
  }

  public stringifyValue(raw: string): string {
    return raw
  }

  public displayValue(raw: string): JSX.Element {
    const data = this.parseValue(raw)

    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map(r => (
            <li key={r}>{JSON.stringify(r)}</li>
          ))}
        </ul>
      )
    }

    return <div>{this.stringifyValue(raw)}</div>
  }

  public abstract adminFormField(): ComponentType<FieldAdminProps>

  public abstract inputFormField(): ComponentType<FieldInputProps>
}
