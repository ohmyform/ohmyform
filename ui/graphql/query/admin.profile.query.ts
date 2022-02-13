import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { ADMIN_PROFILE_FRAGMENT, AdminProfileFragment } from '../fragment/admin.profile.fragment'

interface Data {
  user: AdminProfileFragment
}

export const QUERY = gql`
  query adminMe {
    user: me {
      ...AdminProfile
    }
  }

  ${ADMIN_PROFILE_FRAGMENT}
`

export const useProfileQuery = (
  options?: QueryHookOptions<Data, unknown>
): QueryResult<Data, unknown> => useQuery<Data, unknown>(QUERY, options)
