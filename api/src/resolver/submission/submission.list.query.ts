import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Int, Query } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { SubmissionModel } from '../../dto/submission/submission.model'
import { SubmissionPagerFilterInput } from '../../dto/submission/submission.pager.filter.input'
import { SubmissionPagerModel } from '../../dto/submission/submission.pager.model'
import { FormEntity } from '../../entity/form.entity'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormByIdPipe } from '../../pipe/form/form.by.id.pipe'
import { IdService } from '../../service/id.service'
import { SubmissionService } from '../../service/submission/submission.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class SubmissionListQuery {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly idService: IdService,
  ) {
  }

  @Query(() => SubmissionPagerModel)
  async listSubmissions(
    @User() user: UserEntity,
    @Args('form', {type: () => ID}, FormByIdPipe) form: FormEntity,
    @Args('start', {type: () => Int, defaultValue: 0, nullable: true}) start: number,
    @Args('limit', {type: () => Int, defaultValue: 50, nullable: true}) limit: number,
    @Args('filter', {type: () => SubmissionPagerFilterInput, defaultValue: new SubmissionPagerFilterInput()}) filter: SubmissionPagerFilterInput,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionPagerModel> {
    const [submissions, total] = await this.submissionService.find(
      form,
      start,
      limit,
      {},
      filter,
    )

    submissions.forEach(submission => {
      cache.add(cache.getCacheKey(SubmissionEntity.name, submission.id), submission)
    })

    return new SubmissionPagerModel(
      submissions.map(submission => new SubmissionModel(
        this.idService.encode(submission.id),
        submission
      )),
      total,
      limit,
      start,
    )
  }
}
