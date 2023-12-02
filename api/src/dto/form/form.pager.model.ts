import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'
import { FormModel } from './form.model'

@ObjectType('FormPager')
export class FormPagerModel {
  @Field(() => [FormModel])
    entries: FormModel[]

  @Field(() => GraphQLInt)
    total: number

  @Field(() => GraphQLInt)
    limit: number

  @Field(() => GraphQLInt)
    start: number

  constructor(entries: FormModel[], total: number, limit: number, start: number) {
    this.entries = entries
    this.total = total
    this.limit = limit
    this.start = start
  }
}
