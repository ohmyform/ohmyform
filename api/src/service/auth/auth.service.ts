import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PinoLogger } from 'nestjs-pino'
import { serializeError } from 'serialize-error'
import { AuthJwtModel } from '../../dto/auth/auth.jwt.model'
import { UserEntity } from '../../entity/user.entity'
import { UserService } from '../user/user.service'
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name)
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    // TODO only allow login for verified users!

    try {
      const user = await this.userService.findByUsername(username);
      if (user && await this.passwordService.verify(password, user.passwordHash, user.salt)) {
        return user;
      }
    } catch (e) {
      this.logger.error({
        error: serializeError(e),
        username,
      },'failed to verify user')
    }

    return null;
  }

  public login(user: UserEntity): AuthJwtModel {
    return new AuthJwtModel({
      accessToken: this.jwtService.sign({
        username: user.username,
        roles: user.roles,
        sub: user.id,
      }, {
        expiresIn: '4h',
      }),
      refreshToken: this.jwtService.sign({
        sub: user.id,
      }, {
        expiresIn: '30d',
      }),
    });
  }
}
