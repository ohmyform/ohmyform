import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Deleted')
export class DeletedModel {
  @Field(() => ID)
    id: string

  constructor(id: string) {
    this.id = id
  }
}
