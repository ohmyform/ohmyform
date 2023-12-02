import { ComponentType } from 'react'

import { AbstractType } from './abstract.type'
import { FieldInputProps } from './field.input.props'

export type FieldInputBuilderType<A = AbstractType> = (type: A) => ComponentType<FieldInputProps>
