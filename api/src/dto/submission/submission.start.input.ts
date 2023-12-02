import { Field, InputType } from '@nestjs/graphql'
import { DeviceInput } from './device.input'

@InputType()
export class SubmissionStartInput {
  @Field()
  readonly token: string

  @Field(() => DeviceInput)
  readonly device: DeviceInput
}
