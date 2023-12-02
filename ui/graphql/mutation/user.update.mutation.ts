import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { ADMIN_USER_FRAGMENT, AdminUserFragment } from '../fragment/admin.user.fragment'

interface Data {
  user: AdminUserFragment
}

interface Variables {
  user: AdminUserFragment
}

const MUTATION = gql`
  mutation updateUser($user: UserUpdateInput!) {
    form: updateUser(user: $user) {
      ...AdminUser
    }
  }

  ${ADMIN_USER_FRAGMENT}
`

export const useUserUpdateMutation = (
  data?: MutationHookOptions<Data, Variables>
): MutationTuple<Data, Variables> => useMutation<Data, Variables>(MUTATION, data)
