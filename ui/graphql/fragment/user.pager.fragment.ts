import { gql } from '@apollo/client/core'

export interface UserPagerFragment {
  id: string
  roles: string[]
  verifiedEmail: boolean
  email: string
  created: string
}

export const USER_PAGER_FRAGMENT = gql`
  fragment User on User {
    id
    roles
    verifiedEmail
    email
    created
  }
`
