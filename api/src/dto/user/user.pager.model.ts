import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'
import { UserModel } from './user.model'

@ObjectType('UserPager')
export class UserPagerModel {
  @Field(() => [UserModel])
    entries: UserModel[]

  @Field(() => GraphQLInt)
    total: number

  @Field(() => GraphQLInt)
    limit: number

  @Field(() => GraphQLInt)
    start: number

  constructor(entries: UserModel[], total: number, limit: number, start: number) {
    this.entries = entries
    this.total = total
    this.limit = limit
    this.start = start
  }
}
