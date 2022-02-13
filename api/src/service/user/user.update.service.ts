import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { rolesType } from '../../config/roles'
import { UserUpdateInput } from '../../dto/user/user.update.input'
import { UserEntity } from '../../entity/user.entity'
import { PasswordService } from '../auth/password.service'

@Injectable()
export class UserUpdateService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {
  }

  async update(user: UserEntity, input: UserUpdateInput): Promise<UserEntity> {
    if (input.firstName !== undefined) {
      user.firstName = input.firstName
    }

    if (input.lastName !== undefined) {
      user.lastName = input.lastName
    }

    if (input.email !== undefined) {
      user.email = input.email
      user.emailVerified = false
      // TODO request email verification

      if (undefined !== await this.userRepository.findOne({ email: input.email })) {
        throw new Error('email already in use')
      }
    }

    if (input.username !== undefined) {
      user.username = input.username
    }

    if (input.roles !== undefined) {
      user.roles = input.roles as rolesType
    }

    if (input.language !== undefined) {
      user.language = input.language
    }

    if (input.password !== undefined) {
      user.passwordHash = await this.passwordService.hash(input.password)
    }

    await this.userRepository.save(user)

    return user
  }
}
