import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Query } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { UserModel } from '../../dto/user/user.model'
import { UserEntity } from '../../entity/user.entity'
import { UserService } from '../../service/user/user.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class UserQuery {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Query(() => UserModel)
  @Roles('admin')
  public async getUserById(
    @Args('id', {type: () => ID}) id: string,
    @Context('cache') cache: ContextCache,
  ): Promise<UserModel> {
    const user = await this.userService.findById(id)

    cache.add(cache.getCacheKey(UserEntity.name, user.id), user)

    return new UserModel(user)
  }
}
