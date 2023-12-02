import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ColorsInput {
  @Field()
  readonly background: string

  @Field()
  readonly question: string

  @Field()
  readonly answer: string

  @Field()
  readonly button: string

  @Field()
  readonly buttonActive: string

  @Field()
  readonly buttonText: string
}
