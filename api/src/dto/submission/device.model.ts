import { Field, ObjectType } from '@nestjs/graphql'
import { DeviceEmbedded } from '../../entity/embedded/device.embedded'

@ObjectType('Device')
export class DeviceModel {
  @Field()
  readonly type: string

  @Field()
  readonly name: string

  @Field({ nullable: true })
  readonly language: string

  constructor(device: DeviceEmbedded) {
    this.type = device.type
    this.name = device.name
    this.language = device.language
  }
}
