import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { FORM_PAGER_FRAGMENT, FormPagerFragment } from '../fragment/form.pager.fragment'

interface Data {
  pager: {
    entries: FormPagerFragment[]

    total: number
    limit: number
    start: number
  }
}

interface Variables {
  start?: number
  limit?: number
}

const QUERY = gql`
  query listForms($start: Int, $limit: Int) {
    pager: listForms(start: $start, limit: $limit) {
      entries {
        ...PagerForm
      }
      total
      limit
      start
    }
  }

  ${FORM_PAGER_FRAGMENT}
`

export const useFormPagerQuery = (
  options?: QueryHookOptions<Data, Variables>
): QueryResult<Data, Variables> => useQuery<Data, Variables>(QUERY, options)
