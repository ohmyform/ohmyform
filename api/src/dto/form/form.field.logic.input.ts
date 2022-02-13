import { Field, ID, InputType } from '@nestjs/graphql'
import { FormFieldLogicAction } from '../../entity/form.field.logic.entity'

@InputType()
export class FormFieldLogicInput {
  @Field(() => ID, { nullable: true })
  readonly id?: string

  @Field({ nullable: true })
  readonly formula: string

  // TODO verify action value
  @Field(() => String, { nullable: true })
  readonly action: FormFieldLogicAction

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

  @Field({ nullable: true })
  readonly enabled: boolean
}
