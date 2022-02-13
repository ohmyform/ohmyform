import { Field, ID, ObjectType } from '@nestjs/graphql'
import { FormFieldEntity } from '../../entity/form.field.entity'
import { FormFieldLogicModel } from './form.field.logic.model'
import { FormFieldOptionModel } from './form.field.option.model'
import { FormFieldRatingModel } from './form.field.rating.model'

@ObjectType('FormField')
export class FormFieldModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly title: string

  @Field({ nullable: true })
  readonly slug?: string

  @Field({ nullable: true })
  readonly idx: number

  @Field()
  readonly type: string

  @Field()
  readonly description: string

  @Field()
  readonly required: boolean

  @Field()
  readonly value: string

  @Field(() => [FormFieldOptionModel])
  readonly options: FormFieldOptionModel[]

  @Field(() => [FormFieldLogicModel])
  readonly logic: FormFieldLogicModel[]

  @Field(() => FormFieldRatingModel, { nullable: true })
  readonly rating: FormFieldRatingModel

  constructor(document: FormFieldEntity) {
    this.id = document.id.toString()
    this.idx = document.idx
    this.title = document.title
    this.slug = document.slug
    this.type = document.type
    this.description = document.description
    this.required = document.required
    this.value = document.value
    this.options = document.options?.map(option => new FormFieldOptionModel(option)) || []
    this.logic = document.logic?.map(logic => new FormFieldLogicModel(logic)) || []
    this.rating = document.rating ? new FormFieldRatingModel(document.rating) : null
  }
}
