import { FormPublicFragment } from '../../../graphql/fragment/form.public.fragment'
import { Submission } from '../../use.submission'

export interface LayoutProps {
  form: FormPublicFragment
  submission: Submission
}
