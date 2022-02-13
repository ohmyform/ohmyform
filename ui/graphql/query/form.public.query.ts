import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { FORM_PUBLIC_FRAGMENT, FormPublicFragment } from '../fragment/form.public.fragment'

interface Data {
  form: FormPublicFragment
}

interface Variables {
  id: string
}

const QUERY = gql`
  query getFormById($id: ID!) {
    form: getFormById(id: $id) {
      ...PublicForm
    }
  }

  ${FORM_PUBLIC_FRAGMENT}
`

export const useFormPublicQuery = (
  options?: QueryHookOptions<Data, Variables>
): QueryResult<Data, Variables> => useQuery<Data, Variables>(QUERY, options)
