import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'
import { SettingModel } from './setting.model'

@ObjectType('SettingPager')
export class SettingPagerModel {
  @Field(() => [SettingModel])
    entries: SettingModel[]

  @Field(() => GraphQLInt)
    total: number

  @Field(() => GraphQLInt)
    limit: number

  @Field(() => GraphQLInt)
    start: number

  constructor(entries: SettingModel[], total: number, limit: number, start: number) {
    this.entries = entries
    this.total = total
    this.limit = limit
    this.start = start
  }
}
