import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('AuthToken')
export class AuthJwtModel {
  @Field()
  readonly accessToken: string

  @Field()
  readonly refreshToken: string

  constructor(partial: Partial<AuthJwtModel>) {
    this.accessToken = partial.accessToken
    this.refreshToken = partial.refreshToken
  }
}
