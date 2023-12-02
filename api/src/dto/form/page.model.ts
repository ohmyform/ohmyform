import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PageEntity } from '../../entity/page.entity'

@ObjectType('Page')
export class PageModel {
  readonly _id: number

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

  constructor(id: string, page?: Partial<PageEntity>) {
    if (!page) {
      this.id = id
      this.show = false
      return
    }

    this._id = page.id
    this.id = id
    this.show = page.show
    this.title = page.title
    this.paragraph = page.paragraph
    this.buttonText = page.buttonText
  }
}
