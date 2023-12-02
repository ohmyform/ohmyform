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
    if (this.shouldUpdate(input, user, 'firstName')) {
      user.firstName = input.firstName
    }

    if (this.shouldUpdate(input, user, 'lastName')) {
      user.lastName = input.lastName
    }

    if (this.shouldUpdate(input, user, 'email')) {
      user.email = input.email
      user.emailVerified = false
      // TODO request email verification

      if (undefined !== await this.userRepository.findOne({ email: input.email })) {
        throw new Error('email already in use')
      }
    }

    if (this.shouldUpdate(input, user, 'username')) {
      user.username = input.username
    }

    if (this.shouldUpdate(input, user, 'roles')) {
      user.roles = input.roles as rolesType
    }

    if (this.shouldUpdate(input, user, 'language')) {
      user.language = input.language
    }

    if (input.password !== undefined) {
      user.passwordHash = await this.passwordService.hash(input.password)
    }

    await this.userRepository.save(user)

    return user
  }

  private shouldUpdate(
    input: UserUpdateInput,
    user: UserEntity,
    property: keyof UserUpdateInput
  ): boolean {
    if (input[property] === undefined) {
      return false
    }

    return input[property] == user[property]
  }
}
