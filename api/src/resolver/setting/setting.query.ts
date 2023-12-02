import { Injectable } from '@nestjs/common'
import { Args, ID, Query } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { SettingModel } from '../../dto/setting/setting.model'
import { SettingPagerModel } from '../../dto/setting/setting.pager.model'
import { UserEntity } from '../../entity/user.entity'
import { SettingService } from '../../service/setting.service'

@Injectable()
export class SettingQuery {
  constructor(
    private readonly settingService: SettingService,
  ) {
  }

  @Query(() => SettingPagerModel)
  @Roles('superuser')
  getSettings(): SettingPagerModel {
    // TODO https://github.com/ohmyform/api/issues/3
    return new SettingPagerModel(
      [],
      0,
      0,
      0,
    )
  }

  @Query(() => SettingModel)
  getSetting(
    @Args('key', {type: () => ID}) key: string,
    @User() user: UserEntity,
  ): SettingModel {
    if (!this.settingService.isPublicKey(key) && !user.roles.includes('superuser')) {
      throw new Error(`no access to key ${key}`)
    }

    return this.settingService.getByKey(key)
  }
}
