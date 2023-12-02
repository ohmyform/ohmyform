import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Query } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { SubmissionModel } from '../../dto/submission/submission.model'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { SubmissionByIdPipe } from '../../pipe/submission/submission.by.id.pipe'
import { FormService } from '../../service/form/form.service'
import { IdService } from '../../service/id.service'
import { SubmissionTokenService } from '../../service/submission/submission.token.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class SubmissionQuery {
  constructor(
    private readonly formService: FormService,
    private readonly tokenService: SubmissionTokenService,
    private readonly idService: IdService,
  ) {
  }

  @Query(() => SubmissionModel)
  async getSubmissionById(
    @User() user: UserEntity,
    @Args('id', {type: () => ID}, SubmissionByIdPipe) submission: SubmissionEntity,
    @Args('token', {nullable: true}) token: string,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionModel> {
    if (
      !await this.tokenService.verify(token, submission.tokenHash)
      && !this.formService.isAdmin(submission.form, user)
    ) {
      throw new Error('invalid form')
    }

    cache.add(cache.getCacheKey(SubmissionEntity.name, submission.id), submission)

    return new SubmissionModel(this.idService.encode(submission.id), submission)
  }
}
