import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { USER_PAGER_FRAGMENT, UserPagerFragment } from '../fragment/user.pager.fragment'

interface Data {
  pager: {
    entries: UserPagerFragment[]

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
  query listUsers($start: Int, $limit: Int) {
    pager: listUsers(start: $start, limit: $limit) {
      entries {
        ...User
      }
      total
      limit
      start
    }
  }

  ${USER_PAGER_FRAGMENT}
`

export const useUserPagerQuery = (
  options?: QueryHookOptions<Data, Variables>
): QueryResult<Data, Variables> => useQuery<Data, Variables>(QUERY, options)
