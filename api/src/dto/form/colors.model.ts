import { Field, ObjectType } from '@nestjs/graphql'
import { ColorsEmbedded } from '../../entity/embedded/colors.embedded'

@ObjectType('Colors')
export class ColorsModel {
  @Field()
  readonly background: string

  @Field()
  readonly question: string

  @Field()
  readonly answer: string

  @Field()
  readonly button: string

  @Field()
  readonly buttonActive: string

  @Field()
  readonly buttonText: string

  constructor(partial: Partial<ColorsEmbedded>) {
    this.background = partial.background ?? '#fff'
    this.question = partial.question ?? '#333'
    this.answer = partial.answer ?? '#333'
    this.button = partial.button ?? '#fff'
    this.buttonActive = partial.buttonActive ?? '#40a9ff'
    this.buttonText = partial.buttonText ?? '#666'
  }
}
