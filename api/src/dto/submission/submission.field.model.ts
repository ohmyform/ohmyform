import { Field, ID, ObjectType } from '@nestjs/graphql'
import { SubmissionFieldEntity } from '../../entity/submission.field.entity'

@ObjectType('SubmissionField')
export class SubmissionFieldModel {
  readonly _id: number

  @Field(() => ID)
  readonly id: string

  @Field()
  readonly value: string

  @Field()
  readonly type: string

  constructor(id: string, field: SubmissionFieldEntity) {
    this._id = field.id
    this.id = id
    this.value = JSON.stringify(field.content)
    this.type = field.type
  }
}
