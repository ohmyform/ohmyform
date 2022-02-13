import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { UserModel } from '../../dto/user/user.model'
import { UserEntity } from '../../entity/user.entity'
import { UserService } from '../../service/user/user.service'
import { ContextCache } from '../context.cache'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @ResolveField(() => [String])
  @Roles('user')
  async roles(
    @User() user: UserEntity,
    @Parent() parent: UserModel,
    @Context('cache') cache: ContextCache,
  ): Promise<string[]> {
    return this.returnFieldForSuperuser(
      await cache.get<UserEntity>(cache.getCacheKey(UserEntity.name, parent.id)),
      user,
      c => c.roles
    )
  }

  private returnFieldForSuperuser<T>(
    parent: UserEntity,
    user: UserEntity,
    callback: (user: UserEntity) => T
  ): T {
    if (user.id !== parent.id && !this.userService.isSuperuser(user)) {
      throw new Error('No access to roles')
    }

    return callback(parent)
  }
}
