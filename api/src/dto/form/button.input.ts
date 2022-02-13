import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class ButtonInput {
  @Field(() => ID, { nullable: true })
  readonly id?: string

  @Field({ nullable: true })
  readonly url?: string

  @Field({ nullable: true })
  readonly action?: string

  @Field({ nullable: true })
  readonly text?: string

  @Field({ nullable: true })
  readonly bgColor?: string

  @Field({ nullable: true })
  readonly activeColor?: string

  @Field({ nullable: true })
  readonly color?: string
}
