import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class FormFieldOptionInput {
  @Field(() => ID, { nullable: true })
  readonly id?: string

  @Field({ nullable: true })
  readonly key: string

  @Field({ nullable: true })
  readonly title: string

  @Field()
  readonly value: string
}
