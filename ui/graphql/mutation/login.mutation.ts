import { gql } from '@apollo/client/core'

export interface LoginMutationData {
  tokens: {
    access: string
    refresh: string
  }
}

export interface LoginMutationVariables {
  username: string
  password: string
}

export const LOGIN_MUTATION = gql`
  mutation authLogin($username: String!, $password: String!) {
    tokens: authLogin(username: $username, password: $password) {
      access: accessToken
      refresh: refreshToken
    }
  }
`
