import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'

interface Data {
  disabledSignUp: {
    value: boolean
  }
  loginNote: {
    value: string
  }
  hideContrib: {
    value: string
  }
}

const QUERY = gql`
  query settings {
    disabledSignUp: getSetting(key: "SIGNUP_DISABLED") {
      value: isTrue
    }
    loginNote: getSetting(key: "LOGIN_NOTE") {
      value
    }
    hideContrib: getSetting(key: "HIDE_CONTRIB") {
      value: isTrue
    }
  }
`

export const useSettingsQuery = (
  options?: QueryHookOptions<Data, unknown>
): QueryResult<Data, unknown> => useQuery<Data, unknown>(QUERY, options)
