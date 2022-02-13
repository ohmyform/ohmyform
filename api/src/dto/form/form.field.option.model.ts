import { Field, ID, ObjectType } from '@nestjs/graphql'
import { FormFieldOptionEntity } from '../../entity/form.field.option.entity'

@ObjectType('FormFieldOption')
export class FormFieldOptionModel {
  @Field(() => ID)
  readonly id: string

  @Field({ nullable: true })
  readonly key: string

  @Field({ nullable: true })
  readonly title: string

  @Field()
  readonly value: string

  constructor(option: FormFieldOptionEntity) {
    this.id = option.id.toString()
    this.key = option.key
    this.title = option.title
    this.value = option.value
  }
}
