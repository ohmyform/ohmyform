import React from 'react'
import { CheckboxType } from './checkbox.type'
import { DateType } from './date.type'
import { DropdownType } from './dropdown.type'
import { EmailType } from './email.type'
import { LinkType } from './link.type'
import { NumberType } from './number.type'
import { RadioType } from './radio.type'
import { RatingType } from './rating.type'
import { SliderType } from './slider.type'
import { TextType } from './text.type'
import { TextareaType } from './textarea.type'
import { FieldTypeProps } from './type.props'
import { YesNoType } from './yes_no.type'

export const fieldTypes: {
  [key: string]: React.FC<FieldTypeProps>
} = {
  date: DateType,
  dropdown: DropdownType,
  checkbox: CheckboxType,
  email: EmailType,
  link: LinkType,
  number: NumberType,
  radio: RadioType,
  rating: RatingType,
  slider: SliderType,
  textarea: TextareaType,
  textfield: TextType,
  yes_no: YesNoType,
}
