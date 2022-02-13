import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Query } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { SubmissionModel } from '../../dto/submission/submission.model'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormService } from '../../service/form/form.service'
import { SubmissionService } from '../../service/submission/submission.service'
import { SubmissionTokenService } from '../../service/submission/submission.token.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class SubmissionQuery {
  constructor(
    private readonly formService: FormService,
    private readonly submissionService: SubmissionService,
    private readonly tokenService: SubmissionTokenService,
  ) {
  }

  @Query(() => SubmissionModel)
  async getSubmissionById(
    @User() user: UserEntity,
    @Args('id', {type: () => ID}) id: string,
    @Args('token', {nullable: true}) token: string,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionModel> {
    const submission = await this.submissionService.findById(id)

    if (
      !await this.tokenService.verify(token, submission.tokenHash)
      && !this.formService.isAdmin(submission.form, user)
    ) {
      throw new Error('invalid form')
    }

    cache.add(cache.getCacheKey(SubmissionEntity.name, submission.id), submission)

    return new SubmissionModel(submission)
  }
}
