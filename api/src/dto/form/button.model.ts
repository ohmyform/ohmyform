import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PageButtonEntity } from '../../entity/page.button.entity'

@ObjectType('Button')
export class ButtonModel {
  readonly _id: number

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

  constructor(id: string, button: Partial<PageButtonEntity>) {
    this._id = button.id
    this.id = id
    this.url = button.url
    this.action = button.action
    this.text = button.text
    this.bgColor = button.bgColor
    this.activeColor = button.activeColor
    this.color = button.color
  }
}
