import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'

interface Data {
  tokens: {
    access: string
    refresh: string
  }
}

export interface RegisterUserData {
  username: string
  email: string
  password: string
}

interface Variables {
  user: RegisterUserData
}

const MUTATION = gql`
  mutation authRegister($user: UserCreateInput!) {
    tokens: authRegister(user: $user) {
      access: accessToken
      refresh: refreshToken
    }
  }
`

export const useRegisterMutation = (
  data?: MutationHookOptions<Data, Variables>
): MutationTuple<Data, Variables> => useMutation<Data, Variables>(MUTATION, data)
