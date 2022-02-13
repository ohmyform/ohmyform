import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Setting')
export class SettingModel {
  @Field(() => ID)
  readonly key: string

  @Field({ nullable: true })
  readonly value?: string

  @Field()
  readonly isTrue: boolean

  @Field()
  readonly isFalse: boolean

  constructor(key: string, value: string) {
    this.key = key
    this.value = value

    this.isTrue = value ? (value.toLowerCase() === 'true' || value === '1') : false
    this.isFalse = !this.isTrue
  }
}
