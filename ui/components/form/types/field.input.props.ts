import {
  FormPublicDesignFragment,
  FormPublicFieldFragment,
} from '../../../graphql/fragment/form.public.fragment'

export interface FieldInputProps {
  field: FormPublicFieldFragment
  design: FormPublicDesignFragment
  focus?: boolean
  urlValue?: string
}
