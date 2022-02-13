import { Injectable } from '@nestjs/common'
import { Args, Context, Mutation } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { UserModel } from '../../dto/user/user.model'
import { UserUpdateInput } from '../../dto/user/user.update.input'
import { UserEntity } from '../../entity/user.entity'
import { UserService } from '../../service/user/user.service'
import { UserUpdateService } from '../../service/user/user.update.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class UserUpdateMutation {
  constructor(
    private readonly updateService: UserUpdateService,
    private readonly userService: UserService,
  ) {
  }

  @Mutation(() => UserModel)
  @Roles('superuser')
  async updateUser(
    @User() auth: UserEntity,
    @Args({ name: 'user', type: () => UserUpdateInput }) input: UserUpdateInput,
    @Context('cache') cache: ContextCache,
  ): Promise<UserModel> {
    if (auth.id.toString() === input.id) {
      throw new Error('cannot update your own user')
    }

    const user = await this.userService.findById(input.id)

    await this.updateService.update(user, input)

    cache.add(cache.getCacheKey(UserEntity.name, user.id), user)

    return new UserModel(user)
  }
}
