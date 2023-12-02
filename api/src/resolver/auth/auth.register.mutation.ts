import { Injectable } from '@nestjs/common'
import { Args, Mutation } from '@nestjs/graphql'
import { PinoLogger } from 'nestjs-pino'
import { AuthJwtModel } from '../../dto/auth/auth.jwt.model'
import { UserCreateInput } from '../../dto/user/user.create.input'
import { AuthService } from '../../service/auth/auth.service'
import { SettingService } from '../../service/setting.service'
import { UserCreateService } from '../../service/user/user.create.service'

@Injectable()
export class AuthRegisterMutation {
  constructor(
    private readonly createUser: UserCreateService,
    private readonly settingService: SettingService,
    private readonly auth: AuthService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name)
  }

  @Mutation(() => AuthJwtModel)
  async authRegister(
    @Args({ name: 'user' }) data: UserCreateInput,
  ): Promise<AuthJwtModel> {
    if (this.settingService.isTrue('SIGNUP_DISABLED')) {
      throw new Error('signup disabled')
    }

    this.logger.info({
      email: data.email,
      username: data.username,
    }, 'try to register new user')
    const user = await this.createUser.create(data)

    return this.auth.login(user)
  }
}
