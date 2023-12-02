import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Mutation } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { SubmissionProgressModel } from '../../dto/submission/submission.progress.model'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { SubmissionByIdPipe } from '../../pipe/submission/submission.by.id.pipe'
import { IdService } from '../../service/id.service'
import { SubmissionSetFieldService } from '../../service/submission/submission.set.field.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class SubmissionFinishMutation {
  constructor(
    private readonly setFieldService: SubmissionSetFieldService,
    private readonly idService: IdService,
  ) {
  }

  @Mutation(() => SubmissionProgressModel)
  async submissionFinish(
    @User() user: UserEntity,
    @Args({ name: 'submission', type: () => ID }, SubmissionByIdPipe) submission: SubmissionEntity,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionProgressModel> {
    await this.setFieldService.finishSubmission(submission)

    cache.add(cache.getCacheKey(SubmissionEntity.name, submission.id), submission)

    return new SubmissionProgressModel(this.idService.encode(submission.id), submission)
  }
}
