import { Field, ObjectType } from '@nestjs/graphql'
import { DesignEmbedded } from '../../entity/embedded/design.embedded'
import { ColorsModel } from './colors.model'

@ObjectType('Design')
export class DesignModel {
  @Field()
  readonly colors: ColorsModel

  @Field({ nullable: true })
  readonly font?: string

  @Field({ nullable: true })
  readonly layout?: string

  constructor(partial: Partial<DesignEmbedded>) {
    this.colors = new ColorsModel(partial.colors)
    this.font = partial.font
    this.layout = partial.layout
  }
}
