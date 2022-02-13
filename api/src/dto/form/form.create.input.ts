import { Field, InputType } from '@nestjs/graphql'

@InputType('FormCreateInput')
export class FormCreateInput {
  @Field()
  readonly title: string

  @Field()
  readonly language: string

  @Field({ nullable: true })
  readonly showFooter: boolean

  @Field({ nullable: true })
  readonly anonymousSubmission: boolean

  @Field({ nullable: true })
  readonly isLive: boolean

  @Field({ nullable: true })
  readonly layout: string
}
