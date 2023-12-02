import { gql } from '@apollo/client/core'

export interface AdminProfileFragment {
  id: string
  email: string
  username: string
  language: string
  firstName: string
  lastName: string
  created: string
  lastModified?: string
}

export const ADMIN_PROFILE_FRAGMENT = gql`
  fragment AdminProfile on Profile {
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
