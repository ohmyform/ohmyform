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
  data?: MutationHookOptions<Data, Variables>
): MutationTuple<Data, Variables> => useMutation<Data, Variables>(MUTATION, data)
