import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Mutation } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { SubmissionProgressModel } from '../../dto/submission/submission.progress.model'
import { SubmissionSetFieldInput } from '../../dto/submission/submission.set.field.input'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { SubmissionService } from '../../service/submission/submission.service'
import { SubmissionSetFieldService } from '../../service/submission/submission.set.field.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class SubmissionSetFieldMutation {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly setFieldService: SubmissionSetFieldService,
  ) {
  }

  @Mutation(() => SubmissionProgressModel)
  async submissionSetField(
    @User() user: UserEntity,
    @Args({ name: 'submission', type: () => ID }) id: string,
    @Args({ name: 'field', type: () => SubmissionSetFieldInput }) input: SubmissionSetFieldInput,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionProgressModel> {
    const submission = await this.submissionService.findById(id)

    if (!await this.submissionService.isOwner(submission, input.token)) {
      throw new Error('no access to submission')
    }

    await this.setFieldService.saveField(submission, input)

    cache.add(cache.getCacheKey(SubmissionEntity.name, submission.id), submission)

    return new SubmissionProgressModel(submission)
  }
}
