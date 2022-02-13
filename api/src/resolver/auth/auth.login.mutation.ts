import { Injectable } from '@nestjs/common'
import { Args, Mutation } from '@nestjs/graphql'
import { AuthJwtModel } from '../../dto/auth/auth.jwt.model'
import { AuthService } from '../../service/auth/auth.service'

@Injectable()
export class AuthLoginMutation {
  constructor(
    private readonly auth: AuthService
  ) {
  }

  @Mutation(() => AuthJwtModel)
  async authLogin(
    @Args({ name: 'username', type: () => String }) username: string,
    @Args({ name: 'password', type: () => String }) password: string,
  ): Promise<AuthJwtModel> {
    const user = await this.auth.validateUser(username, password)

    if (!user) {
      throw new Error('invalid user / password')
    }

    return this.auth.login(user)
  }
}
