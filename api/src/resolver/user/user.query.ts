import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Query } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { UserModel } from '../../dto/user/user.model'
import { UserEntity } from '../../entity/user.entity'
import { UserByIdPipe } from '../../pipe/user/user.by.id.pipe'
import { IdService } from '../../service/id.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class UserQuery {
  constructor(
    private readonly idService: IdService,
  ) {
  }

  @Query(() => UserModel)
  @Roles('admin')
  public getUserById(
    @Args('id', {type: () => ID}, UserByIdPipe) user: UserEntity,
    @Context('cache') cache: ContextCache,
  ): UserModel {
    cache.add(cache.getCacheKey(UserEntity.name, user.id), user)

    return new UserModel(this.idService.encode(user.id), user)
  }
}
