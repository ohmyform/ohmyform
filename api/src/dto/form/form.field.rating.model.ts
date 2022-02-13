import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'
import { RatingEmbedded } from '../../entity/embedded/rating.embedded'

@ObjectType('FormFieldRating')
export class FormFieldRatingModel {
  @Field(() => GraphQLInt, { nullable: true })
  readonly steps: number

  @Field({ nullable: true })
  readonly shape: string

  constructor(option: RatingEmbedded) {
    this.steps = option.steps
    this.shape = option.shape
  }
}
