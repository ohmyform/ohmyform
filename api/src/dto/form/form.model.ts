import { Field, ID, ObjectType } from '@nestjs/graphql'
import { FormEntity } from '../../entity/form.entity'

@ObjectType('Form')
export class FormModel {
  readonly _id: number

  @Field(() => ID)
  readonly id: string

  @Field()
  readonly title: string

  @Field()
  readonly created: Date

  @Field({ nullable: true })
  readonly lastModified?: Date

  @Field()
  readonly language: string

  @Field()
  readonly showFooter: boolean

  @Field()
  readonly anonymousSubmission: boolean

  constructor(id: string, form: FormEntity) {
    this._id = form.id
    this.id = id
    this.title = form.title
    this.created = form.created
    this.lastModified = form.lastModified
    this.language = form.language
    this.showFooter = form.showFooter
    this.anonymousSubmission = form.anonymousSubmission
  }
}
