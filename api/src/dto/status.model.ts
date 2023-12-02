import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Version')
export class StatusModel {
  @Field()
  readonly version: string

  constructor(partial: Partial<StatusModel>) {
    this.version = partial.version
  }
}
