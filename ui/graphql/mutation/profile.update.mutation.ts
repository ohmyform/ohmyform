import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { ADMIN_PROFILE_FRAGMENT } from '../fragment/admin.profile.fragment'
import { AdminUserFragment } from '../fragment/admin.user.fragment'

export interface Data {
  user: AdminUserFragment
}

export interface Variables {
  user: {
    email?: string
    firstName?: string
    id: string
    language?: string
    lastName?: string
    password?: string
    username?: string
  }
}

export const MUTATION = gql`
  mutation updateProfile($user: ProfileUpdateInput!) {
    form: updateProfile(user: $user) {
      ...AdminProfile
    }
  }

  ${ADMIN_PROFILE_FRAGMENT}
`

export const useProfileUpdateMutation = (
  data?: MutationHookOptions<Data, Variables>
): MutationTuple<Data, Variables> => useMutation<Data, Variables>(MUTATION, data)
