import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'

interface Data {
  form: {
    id
  }
}

interface Variables {
  id: string
}

const MUTATION = gql`
  mutation deleteForm($id: ID!) {
    form: deleteForm(id: $id) {
      id
    }
  }
`

export const useFormDeleteMutation = (
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
