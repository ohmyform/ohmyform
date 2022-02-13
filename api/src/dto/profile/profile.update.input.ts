import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class ProfileUpdateInput {
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

  @Field({ nullable: true })
  readonly language: string
}
