import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@InputType()
export class UserCreateInput {
  @Field()
  @MinLength(2)
  @MaxLength(50)
    username: string

  @Field()
  @IsEmail()
  @IsNotEmpty()
    email: string

  @Field()
  @MinLength(5)
    password: string

  @Field({ nullable: true })
    firstName?: string

  @Field({ nullable: true })
    lastName?: string

  @Field({ nullable: true })
    language?: string
}
