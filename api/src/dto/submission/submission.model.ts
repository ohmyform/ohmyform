import { Field, ID, ObjectType } from '@nestjs/graphql'
import { SubmissionEntity } from '../../entity/submission.entity'
import { DeviceModel } from './device.model'
import { GeoLocationModel } from './geo.location.model'

@ObjectType('Submission')
export class SubmissionModel {
  @Field(() => ID)
  readonly id: number

  @Field()
  readonly ipAddr: string

  @Field(() => GeoLocationModel)
  readonly geoLocation: GeoLocationModel

  @Field(() => DeviceModel)
  readonly device: DeviceModel

  @Field()
  readonly timeElapsed: number

  @Field()
  readonly percentageComplete: number

  @Field()
  readonly created: Date

  @Field({ nullable: true })
  readonly lastModified?: Date

  constructor(submission: SubmissionEntity) {
    this.id = submission.id

    this.ipAddr = submission.ipAddr
    this.geoLocation = new GeoLocationModel(submission.geoLocation)
    this.device = new DeviceModel(submission.device)

    this.timeElapsed = submission.timeElapsed
    this.percentageComplete = submission.percentageComplete

    this.created = submission.created
    this.lastModified = submission.lastModified
  }
}
