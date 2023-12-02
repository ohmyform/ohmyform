import { Field, ID, ObjectType } from '@nestjs/graphql'
import { FormHookEntity } from '../../entity/form.hook.entity'

@ObjectType('FormHook')
export class FormHookModel {
  readonly _id: number

  @Field(() => ID)
  readonly id: string

  @Field()
  readonly enabled: boolean

  @Field({ nullable: true })
  readonly url?: string

  @Field({ nullable: true })
  readonly format?: string

  constructor(id, hook: FormHookEntity) {
    this._id = hook.id
    this.id = id
    this.enabled = hook.enabled
    this.url = hook.url
    this.format = hook.format
  }
}
