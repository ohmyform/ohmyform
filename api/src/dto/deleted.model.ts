import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Deleted')
export class DeletedModel {
  @Field()
    id: string

  constructor(id: string) {
    this.id = id
  }
}
