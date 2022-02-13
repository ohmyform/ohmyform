import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Int, Query } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { SubmissionModel } from '../../dto/submission/submission.model'
import { SubmissionPagerModel } from '../../dto/submission/submission.pager.model'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormService } from '../../service/form/form.service'
import { SubmissionService } from '../../service/submission/submission.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class SubmissionListQuery {
  constructor(
    private readonly formService: FormService,
    private readonly submissionService: SubmissionService,
  ) {
  }

  @Query(() => SubmissionPagerModel)
  async listSubmissions(
    @User() user: UserEntity,
    @Args('form', {type: () => ID}) id: string,
    @Args('start', {type: () => Int, defaultValue: 0, nullable: true}) start: number,
    @Args('limit', {type: () => Int, defaultValue: 50, nullable: true}) limit: number,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionPagerModel> {
    const form = await this.formService.findById(id)

    const [submissions, total] = await this.submissionService.find(
      form,
      start,
      limit,
      {},
    )

    submissions.forEach(submission => {
      cache.add(cache.getCacheKey(SubmissionEntity.name, submission.id), submission)
    })

    return new SubmissionPagerModel(
      submissions.map(submission => new SubmissionModel(submission)),
      total,
      limit,
      start,
    )
  }
}
