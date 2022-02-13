import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PageButtonEntity } from '../../entity/page.button.entity'

@ObjectType('Button')
export class ButtonModel {
  @Field(() => ID)
  readonly id: string

  @Field({ nullable: true })
  readonly url?: string

  @Field({ nullable: true })
  readonly action?: string

  @Field({ nullable: true })
  readonly text?: string

  @Field({ nullable: true })
  readonly bgColor?: string

  @Field({ nullable: true })
  readonly activeColor?: string

  @Field({ nullable: true })
  readonly color?: string

  constructor(button: Partial<PageButtonEntity>) {
    this.id = button.id.toString()
    this.url = button.url
    this.action = button.action
    this.text = button.text
    this.bgColor = button.bgColor
    this.activeColor = button.activeColor
    this.color = button.color
  }
}
