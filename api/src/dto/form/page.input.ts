import { Field, ID, InputType } from '@nestjs/graphql'
import { ButtonInput } from './button.input'

@InputType()
export class PageInput {
  @Field(() => ID, { nullable: true })
  readonly id?: string

  @Field()
  readonly show: boolean

  @Field({ nullable: true })
  readonly title?: string

  @Field({ nullable: true })
  readonly paragraph?: string

  @Field({ nullable: true })
  readonly buttonText?: string

  @Field(() => [ButtonInput], { nullable: true })
  readonly buttons: ButtonInput[]
}
