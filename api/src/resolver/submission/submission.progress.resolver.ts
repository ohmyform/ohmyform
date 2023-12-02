import { Resolver } from '@nestjs/graphql'
import { SubmissionProgressModel } from '../../dto/submission/submission.progress.model'

@Resolver(() => SubmissionProgressModel)
export class SubmissionProgressResolver {

}
