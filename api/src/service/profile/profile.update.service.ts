import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProfileUpdateInput } from '../../dto/profile/profile.update.input'
import { UserEntity } from '../../entity/user.entity'
import { PasswordService } from '../auth/password.service'
import { UserTokenService } from '../user/user.token.service'

@Injectable()
export class ProfileUpdateService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly userTokenService: UserTokenService,
  ) {
  }

  async verifyEmail(user: UserEntity, token: string): Promise<UserEntity> {
    if (!await this.userTokenService.verify(token, user.token)) {
      throw new Error('invalid token')
    }

    return await this.userRepository.save(user)
  }

  async update(user: UserEntity, input: ProfileUpdateInput): Promise<UserEntity> {
    if (input.firstName !== undefined) {
      user.firstName = input.firstName
    }

    if (input.lastName !== undefined) {
      user.lastName = input.lastName
    }

    if (input.email !== undefined && user.email !== input.email) {
      user.email = input.email
      user.emailVerified = false
      // TODO request email verification

      if (undefined !== await this.userRepository.findOne({ email: input.email })) {
        throw new Error('email already in use')
      }
    }

    if (input.username !== undefined && user.username !== input.username) {
      user.username = input.username

      if (undefined !== await this.userRepository.findOne({ username: input.username })) {
        throw new Error('username already in use')
      }
    }

    if (input.language !== undefined) {
      user.language = input.language
    }

    if (input.password !== undefined) {
      user.passwordHash = await this.passwordService.hash(input.password)
    }

    return await this.userRepository.save(user)
  }
}
