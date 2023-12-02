import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Mutation } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { SubmissionProgressModel } from '../../dto/submission/submission.progress.model'
import { SubmissionSetFieldInput } from '../../dto/submission/submission.set.field.input'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { SubmissionByIdPipe } from '../../pipe/submission/submission.by.id.pipe'
import { IdService } from '../../service/id.service'
import { SubmissionService } from '../../service/submission/submission.service'
import { SubmissionSetFieldService } from '../../service/submission/submission.set.field.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class SubmissionSetFieldMutation {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly setFieldService: SubmissionSetFieldService,
    private readonly idService: IdService,
  ) {
  }

  @Mutation(() => SubmissionProgressModel)
  async submissionSetField(
    @User() user: UserEntity,
    @Args({ name: 'submission', type: () => ID }, SubmissionByIdPipe) submission: SubmissionEntity,
    @Args({ name: 'field', type: () => SubmissionSetFieldInput }) input: SubmissionSetFieldInput,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionProgressModel> {
    if (!await this.submissionService.isOwner(submission, input.token)) {
      throw new Error('no access to submission')
    }

    await this.setFieldService.saveField(submission, input)

    cache.add(cache.getCacheKey(SubmissionEntity.name, submission.id), submission)

    return new SubmissionProgressModel(this.idService.encode(submission.id), submission)
  }
}
