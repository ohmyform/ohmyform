import { Field, InputType } from '@nestjs/graphql'
import { PageInput } from './page.input'

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

  @Field({ nullable: true })
  readonly startPage: PageInput

  @Field({ nullable: true })
  readonly endPage: PageInput
}
