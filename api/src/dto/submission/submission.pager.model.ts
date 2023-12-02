import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'
import { SubmissionModel } from './submission.model'

@ObjectType('SubmissionPager')
export class SubmissionPagerModel {
  @Field(() => [SubmissionModel])
    entries: SubmissionModel[]

  @Field(() => GraphQLInt)
    total: number

  @Field(() => GraphQLInt)
    limit: number

  @Field(() => GraphQLInt)
    start: number

  constructor(entries: SubmissionModel[], total: number, limit: number, start: number) {
    this.entries = entries
    this.total = total
    this.limit = limit
    this.start = start
  }
}
