import { Field, InputType } from '@nestjs/graphql'

@InputType('SubmissionPagerFilterInput')
export class SubmissionPagerFilterInput {
  @Field({ nullable: true } )
    finished?: boolean

  @Field({ nullable: true } )
    excludeEmpty?: boolean
}
