import { Injectable } from '@nestjs/common'
import { Context, Query } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { ProfileModel } from '../../dto/profile/profile.model'
import { UserEntity } from '../../entity/user.entity'
import { IdService } from '../../service/id.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class ProfileQuery {
  constructor(
    private readonly idService: IdService,
  ) {
  }

  @Query(() => ProfileModel)
  @Roles('user')
  public me(
    @User() user: UserEntity,
    @Context('cache') cache: ContextCache,
  ): ProfileModel {
    cache.add(cache.getCacheKey(UserEntity.name, user.id), user)

    return new ProfileModel(this.idService.encode(user.id), user)
  }
}
