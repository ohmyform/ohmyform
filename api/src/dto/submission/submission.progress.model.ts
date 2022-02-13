import { Field, ID, ObjectType } from '@nestjs/graphql'
import { SubmissionEntity } from '../../entity/submission.entity'

@ObjectType('SubmissionProgress')
export class SubmissionProgressModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly timeElapsed: number

  @Field()
  readonly percentageComplete: number

  @Field()
  readonly created: Date

  @Field({ nullable: true })
  readonly lastModified?: Date

  constructor(submission: Partial<SubmissionEntity>) {
    this.id = submission.id.toString()

    this.timeElapsed = submission.timeElapsed
    this.percentageComplete = submission.percentageComplete

    this.created = submission.created
    this.lastModified = submission.lastModified
  }
}
