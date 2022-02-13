import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { UserModel } from '../../dto/user/user.model'
import { UserPagerModel } from '../../dto/user/user.pager.model'
import { UserEntity } from '../../entity/user.entity'
import { UserService } from '../../service/user/user.service'
import { ContextCache } from '../context.cache'

@Resolver(() => UserPagerModel)
export class UserListQuery {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Query(() => UserPagerModel)
  @Roles('superuser')
  async listUsers(
    @Args('start', {type: () => Int, defaultValue: 0, nullable: true}) start: number,
    @Args('limit', {type: () => Int, defaultValue: 50, nullable: true}) limit: number,
    @Context('cache') cache: ContextCache,
  ): Promise<UserPagerModel> {
    const [entities, total] = await this.userService.find(start, limit)

    return new UserPagerModel(
      entities.map(entity => {
        cache.add(cache.getCacheKey(UserEntity.name, entity.id), entity)
        return new UserModel(entity)
      }),
      total,
      limit,
      start,
    )
  }
}
