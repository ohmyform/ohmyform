import { AbstractType } from './abstract.type'
import { CheckboxType } from './checkbox'
import { DateType } from './date'
import { DropdownType } from './dropdown'
import { EmailType } from './email'
import { HiddenType } from './hidden'
import { LinkType } from './link'
import { LocationType } from './location'
import { NumberType } from './number'
import { RadioType } from './radio'
import { RatingType } from './rating'
import { SliderType } from './slider'
import { TextareaType } from './textarea'
import { TextfieldType } from './textfield'
import { YesNoType } from './yes_no'

export const fieldTypes: {
  [key: string]: AbstractType
} = {
  checkbox: new CheckboxType(),
  date: new DateType(),
  dropdown: new DropdownType(),
  email: new EmailType(),
  hidden: new HiddenType(),
  link: new LinkType(),
  location: new LocationType(),
  number: new NumberType(),
  radio: new RadioType(),
  rating: new RatingType(),
  slider: new SliderType(),
  textarea: new TextareaType(),
  textfield: new TextfieldType(),
  yes_no: new YesNoType(),
}
