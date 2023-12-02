import { UserDeleteMutation } from './user.delete.mutation'
import { UserListQuery } from './user.list.query'
import { UserQuery } from './user.query'
import { UserResolver } from './user.resolver'
import { UserStatisticQuery } from './user.statistic.query'
import { UserStatisticResolver } from './user.statistic.resolver'
import { UserUpdateMutation } from './user.update.mutation'

export const userResolvers = [
  UserDeleteMutation,
  UserListQuery,
  UserQuery,
  UserResolver,
  UserStatisticQuery,
  UserStatisticResolver,
  UserUpdateMutation,
]
