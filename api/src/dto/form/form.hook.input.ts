import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class FormHookInput {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly enabled: boolean

  @Field({ nullable: true })
  readonly url?: string

  @Field({ nullable: true })
  readonly format?: string
}
