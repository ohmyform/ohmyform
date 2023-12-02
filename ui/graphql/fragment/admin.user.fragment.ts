import { gql } from '@apollo/client/core'

export interface AdminUserFragment {
  id: string
  email: string
  username: string
  language: string
  firstName: string
  lastName: string
  roles: string[]
  created: string
  lastModified?: string
}

export const ADMIN_USER_FRAGMENT = gql`
  fragment AdminUser on User {
    id
    email
    username
    language
    firstName
    lastName
    roles
    created
    lastModified
  }
`
