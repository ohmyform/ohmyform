import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PageEntity } from '../../entity/page.entity'
import { ButtonModel } from './button.model'

@ObjectType('Page')
export class PageModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly show: boolean

  @Field({ nullable: true })
  readonly title?: string

  @Field({ nullable: true })
  readonly paragraph?: string

  @Field({ nullable: true })
  readonly buttonText?: string

  @Field(() => [ButtonModel])
  readonly buttons: ButtonModel[]

  constructor(page: Partial<PageEntity>) {
    if (!page) {
      this.id = Math.random().toString()
      this.show = false
      this.buttons = []
      return
    }

    this.id = page.id.toString()
    this.show = page.show
    this.title = page.title
    this.paragraph = page.paragraph
    this.buttonText = page.buttonText
    this.buttons = (page.buttons || []).map(button => new ButtonModel(button))
  }
}
