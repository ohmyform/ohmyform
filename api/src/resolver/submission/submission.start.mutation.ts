import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Mutation } from '@nestjs/graphql'
import { IpAddress } from '../../decorator/ip.address.decorator'
import { User } from '../../decorator/user.decorator'
import { SubmissionProgressModel } from '../../dto/submission/submission.progress.model'
import { SubmissionStartInput } from '../../dto/submission/submission.start.input'
import { FormEntity } from '../../entity/form.entity'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormByIdPipe } from '../../pipe/form/form.by.id.pipe'
import { FormService } from '../../service/form/form.service'
import { IdService } from '../../service/id.service'
import { SubmissionStartService } from '../../service/submission/submission.start.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class SubmissionStartMutation {
  constructor(
    private readonly startService: SubmissionStartService,
    private readonly formService: FormService,
    private readonly idService: IdService,
  ) {
  }

  @Mutation(() => SubmissionProgressModel)
  async submissionStart(
    @User() user: UserEntity,
    @Args({ name: 'form', type: () => ID }, FormByIdPipe) form: FormEntity,
    @Args({ name: 'submission', type: () => SubmissionStartInput }) input: SubmissionStartInput,
    @IpAddress() ipAddr: string,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionProgressModel> {
    if (!form.isLive && !this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    const submission = await this.startService.start(form, input, user, ipAddr)

    cache.add(cache.getCacheKey(SubmissionEntity.name, submission.id), submission)

    return new SubmissionProgressModel(this.idService.encode(submission.id), submission)
  }
}
