import { Field, ID, ObjectType } from '@nestjs/graphql'
import { FormEntity } from '../../entity/form.entity'

@ObjectType('Form')
export class FormModel {
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

  constructor(form: FormEntity) {
    this.id = form.id.toString()
    this.title = form.title
    this.created = form.created
    this.lastModified = form.lastModified
    this.language = form.language
    this.showFooter = form.showFooter
    this.anonymousSubmission = form.anonymousSubmission
  }
}
