import { gql } from '@apollo/client/core'

export interface FormPagerFragment {
  id: string
  created: string
  lastModified?: string
  title: string
  isLive: boolean
  language: string
  admin: {
    id: string
    email: string
    username: string
  }
}

export const FORM_PAGER_FRAGMENT = gql`
  fragment PagerForm on Form {
    id
    created
    lastModified
    title
    isLive
    language
    admin {
      id
      email
      username
    }
  }
`
