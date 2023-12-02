import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { FORM_FRAGMENT, FormFragment } from '../fragment/form.fragment'

interface Data {
  form: FormFragment
}

interface Variables {
  form: {
    isLive: boolean
    language: string
    showFooter?: boolean
    title: string
  }
}

const MUTATION = gql`
  mutation createForm($form: FormCreateInput!) {
    form: createForm(form: $form) {
      ...Form
    }
  }

  ${FORM_FRAGMENT}
`

export const useFormCreateMutation = (
  options: MutationHookOptions<Data, Variables> = {}
): MutationTuple<Data, Variables> => {
  const oldUpdate = options.update

  options.update = (cache, result, options) => {
    cache.evict({
      fieldName: 'listForms',
    })
    cache.gc()

    if (oldUpdate) {
      oldUpdate(cache, result, options)
    }
  }

  return useMutation<Data, Variables>(MUTATION, options)
}
