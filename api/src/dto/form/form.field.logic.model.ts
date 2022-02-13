import { Field, ID, ObjectType } from '@nestjs/graphql'
import { FormFieldLogicEntity } from '../../entity/form.field.logic.entity'

@ObjectType('FormFieldLogic')
export class FormFieldLogicModel {
  @Field(() => ID)
  readonly id: string

  @Field({ nullable: true })
  readonly formula: string

  @Field()
  readonly action: string

  @Field({ nullable: true })
  readonly idx?: number

  @Field(() => ID, { nullable: true })
  readonly jumpTo?: string

  @Field({ nullable: true })
  readonly visible?: boolean

  @Field({ nullable: true })
  readonly disable?: boolean

  @Field({ nullable: true })
  readonly require?: boolean

  @Field()
  readonly enabled: boolean

  constructor(document: FormFieldLogicEntity) {
    this.id = document.id.toString()
    this.enabled = document.enabled

    this.formula = document.formula
    this.jumpTo = document.jumpTo?.id.toString()

    this.idx = document.idx
    this.action = document.action
    this.visible = document.visible
    this.disable = document.disable
    this.require = document.require
  }
}
