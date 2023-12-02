import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SettingModel } from '../dto/setting/setting.model'

@Injectable()
export class SettingService {
  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  isPublicKey(key: string): boolean {
    return [
      'SIGNUP_DISABLED',
      'LOGIN_NOTE',
      'HIDE_CONTRIB',
    ].includes(key)
  }

  getByKey(key: string): SettingModel {
    switch (key) {
      case 'SIGNUP_DISABLED':
      case 'LOGIN_NOTE':
      case 'DEFAULT_ROLE':
      case 'HIDE_CONTRIB':
        return new SettingModel(key, this.configService.get(key))
    }

    throw new Error(`no config stored for key ${key}`)
  }

  isTrue(key: string): boolean {
    return this.getByKey(key).isTrue
  }

  isFalse(key: string): boolean {
    return this.getByKey(key).isFalse
  }
}
