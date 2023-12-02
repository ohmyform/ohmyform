import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { FORM_FRAGMENT, FormFragment } from '../fragment/form.fragment'

interface Data {
  form: FormFragment
}

interface Variables {
  form: FormFragment
}

const MUTATION = gql`
  mutation updateForm($form: FormUpdateInput!) {
    form: updateForm(form: $form) {
      ...Form
    }
  }

  ${FORM_FRAGMENT}
`

export const useFormUpdateMutation = (
  data?: MutationHookOptions<Data, Variables>
): MutationTuple<Data, Variables> => useMutation<Data, Variables>(MUTATION, data)
