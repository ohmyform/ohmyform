import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'

interface Data {
  submission: {
    id
  }
}

interface Variables {
  id: string
}

const MUTATION = gql`
  mutation submissionDelete($id: ID!) {
    submission: submissionDelete(id: $id) {
      id
    }
  }
`

export const useSubmissionDeleteMutation = (
  options: MutationHookOptions<Data, Variables> = {}
): MutationTuple<Data, Variables> => {
  const oldUpdate = options.update

  options.update = (cache, result, options) => {
    cache.evict({
      fieldName: 'listSubmissions',
    })
    cache.gc()

    if (oldUpdate) {
      oldUpdate(cache, result, options)
    }
  }

  return useMutation<Data, Variables>(MUTATION, options)
}
