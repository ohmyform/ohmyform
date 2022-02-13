import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { FORM_FRAGMENT, FormFragment } from '../fragment/form.fragment'

export interface Data {
  form: FormFragment
}

interface Variables {
  id: string
}

const QUERY = gql`
  query getFormById($id: ID!) {
    form: getFormById(id: $id) {
      ...Form
    }
  }

  ${FORM_FRAGMENT}
`

export const useFormQuery = (
  options?: QueryHookOptions<Data, Variables>
): QueryResult<Data, Variables> => useQuery<Data, Variables>(QUERY, options)
