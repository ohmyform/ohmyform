import { Field, ID, ObjectType } from '@nestjs/graphql'
import { UserEntity } from '../../entity/user.entity'

@ObjectType('User')
export class UserModel {
  readonly _id: number

  @Field(() => ID)
  readonly id: string

  /**
   * @deprecated use emailVerified instead
   */
  @Field({ deprecationReason: 'use emailVerified instead' })
  readonly verifiedEmail: boolean

  @Field()
  readonly emailVerified: boolean

  @Field()
  readonly username: string

  @Field()
  readonly email: string

  @Field()
  readonly language: string

  @Field({ nullable: true })
  readonly firstName?: string

  @Field({ nullable: true })
  readonly lastName?: string

  @Field()
  readonly created: Date

  @Field({ nullable: true })
  readonly lastModified: Date

  constructor(id: string, user: UserEntity) {
    this._id = user.id
    this.id = id
    this.username = user.username
    this.email = user.email

    this.language = user.language
    this.firstName = user.firstName
    this.lastName = user.lastName

    this.verifiedEmail = user.emailVerified
    this.emailVerified = user.emailVerified

    this.created = user.created
    this.lastModified = user.lastModified
  }
}
