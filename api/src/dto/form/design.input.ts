import { Field, InputType } from '@nestjs/graphql'
import { ColorsInput } from './colors.input'

@InputType()
export class DesignInput {
  @Field()
  readonly colors: ColorsInput

  @Field({ nullable: true })
  readonly font?: string

  @Field({ nullable: true })
  readonly layout?: string
}
