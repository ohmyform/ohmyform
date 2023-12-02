import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateInput {
  @Field(() => ID)
  readonly id: string

  @Field({ nullable: true })
  readonly username: string

  @Field({ nullable: true })
  readonly email: string

  @Field({ nullable: true })
  readonly firstName: string

  @Field({ nullable: true })
  readonly lastName: string

  @Field({ nullable: true })
  readonly password: string

  // TODO validate
  @Field(() => [String], { nullable: true })
  readonly roles: string[]

  @Field({ nullable: true })
  readonly language: string
}
