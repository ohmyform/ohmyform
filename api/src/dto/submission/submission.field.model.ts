import { Field, ID, ObjectType } from '@nestjs/graphql'
import { SubmissionFieldEntity } from '../../entity/submission.field.entity'

@ObjectType('SubmissionField')
export class SubmissionFieldModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly value: string

  @Field()
  readonly type: string

  constructor(field: SubmissionFieldEntity) {
    this.id = field.id.toString()
    this.value = JSON.stringify(field.content)
    this.type = field.type
  }
}
