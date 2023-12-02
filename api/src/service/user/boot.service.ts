import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PinoLogger } from 'nestjs-pino'
import { serializeError } from 'serialize-error'
import { UserCreateService } from './user.create.service'
import { UserService } from './user.service'

@Injectable()
export class BootService implements OnApplicationBootstrap {
  constructor(
    private readonly createService: UserCreateService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name)
  }

  async onApplicationBootstrap(): Promise<void> {
    const create = this.configService.get<string>('CREATE_ADMIN', 'false')

    if (!create || [
      'false', '0', 'no', '',
    ].includes(create.toLowerCase())) {
      return
    }

    this.logger.warn('admin user check is still enabled! once your use has been created this should be disabled')

    const username = this.configService.get<string>('ADMIN_USERNAME', 'root')
    const email = this.configService.get<string>('ADMIN_EMAIL', 'admin@ohmyform.com')
    const password = this.configService.get<string>('ADMIN_PASSWORD', 'root')

    if (await this.userService.usernameInUse(username)) {
      this.logger.info('username already exists, skip creating')
      return
    }

    if (await this.userService.emailInUse(email)) {
      this.logger.info('email already exists, skip creating')
      return
    }

    try {
      await this.createService.create({
        username,
        email,
        password,
      }, [
        'user', 'admin', 'superuser',
      ])
    } catch (e) {
      this.logger.error({
        error: serializeError(e),
      }, 'could not create admin user')
      return
    }

    this.logger.info('new root user created')
  }
}
