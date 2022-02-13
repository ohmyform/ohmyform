import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class SubmissionSetFieldInput {
  @Field()
  readonly token: string

  @Field(() => ID)
  readonly field: string

  @Field()
  readonly data: string
}
