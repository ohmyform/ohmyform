import { Field, InputType } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'

@InputType()
export class FormFieldRatingInput {
  @Field(() => GraphQLInt, { nullable: true })
  readonly steps: number

  @Field({ nullable: true })
  readonly shape: string
}
