import { Field, ID, InputType } from '@nestjs/graphql'
import { DesignInput } from './design.input'
import { FormFieldInput } from './form.field.input'
import { FormHookInput } from './form.hook.input'
import { FormNotificationInput } from './form.notification.input'
import { PageInput } from './page.input'

@InputType()
export class FormUpdateInput {
  @Field(() => ID)
  readonly id: string

  @Field({ nullable: true })
  readonly title: string

  @Field({ nullable: true })
  readonly language: string

  @Field({ nullable: true })
  readonly showFooter: boolean

  @Field({ nullable: true })
  readonly anonymousSubmission: boolean

  @Field({ nullable: true })
  readonly isLive: boolean

  @Field(() => [FormFieldInput], { nullable: true })
  readonly fields: FormFieldInput[]

  @Field(() => [FormHookInput], { nullable: true })
  readonly hooks: FormHookInput[]

  @Field({ nullable: true })
  readonly design: DesignInput

  @Field({ nullable: true })
  readonly startPage: PageInput

  @Field({ nullable: true })
  readonly endPage: PageInput

  @Field(() => [FormNotificationInput], { nullable: true })
  readonly notifications: FormNotificationInput[]
}
