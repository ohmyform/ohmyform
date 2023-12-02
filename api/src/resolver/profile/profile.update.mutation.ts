import { Injectable } from '@nestjs/common'
import { Args, Context, Mutation } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { ProfileModel } from '../../dto/profile/profile.model'
import { ProfileUpdateInput } from '../../dto/profile/profile.update.input'
import { UserEntity } from '../../entity/user.entity'
import { IdService } from '../../service/id.service'
import { ProfileUpdateService } from '../../service/profile/profile.update.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class ProfileUpdateMutation {
  constructor(
    private readonly updateService: ProfileUpdateService,
    private readonly idService: IdService,
  ) {
  }

  @Mutation(() => ProfileModel)
  @Roles('user')
  async updateProfile(
    @User() user: UserEntity,
    @Args({ name: 'user', type: () => ProfileUpdateInput }) input: ProfileUpdateInput,
    @Context('cache') cache: ContextCache,
  ): Promise<ProfileModel> {
    await this.updateService.update(user, input)

    cache.add(cache.getCacheKey(UserEntity.name, user.id), user)

    return new ProfileModel(this.idService.encode(user.id), user)
  }

  @Mutation(() => ProfileModel)
  @Roles('user')
  async verifyEmail(
    @User() user: UserEntity,
    @Args({ name: 'token' }) token: string,
    @Context('cache') cache: ContextCache,
  ): Promise<ProfileModel> {
    await this.updateService.verifyEmail(user, token)

    cache.add(cache.getCacheKey(UserEntity.name, user.id), user)

    return new ProfileModel(this.idService.encode(user.id), user)
  }
}
