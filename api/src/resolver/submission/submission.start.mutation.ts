import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Mutation } from '@nestjs/graphql'
import { IpAddress } from '../../decorator/ip.address.decorator'
import { User } from '../../decorator/user.decorator'
import { SubmissionProgressModel } from '../../dto/submission/submission.progress.model'
import { SubmissionStartInput } from '../../dto/submission/submission.start.input'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormService } from '../../service/form/form.service'
import { SubmissionStartService } from '../../service/submission/submission.start.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class SubmissionStartMutation {
  constructor(
    private readonly startService: SubmissionStartService,
    private readonly formService: FormService,
  ) {
  }

  @Mutation(() => SubmissionProgressModel)
  async submissionStart(
    @User() user: UserEntity,
    @Args({ name: 'form', type: () => ID }) id: string,
    @Args({ name: 'submission', type: () => SubmissionStartInput }) input: SubmissionStartInput,
    @IpAddress() ipAddr: string,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionProgressModel> {
    const form = await this.formService.findById(id)

    if (!form.isLive && !this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    const submission = await this.startService.start(form, input, user, ipAddr)

    cache.add(cache.getCacheKey(SubmissionEntity.name, submission.id), submission)

    return new SubmissionProgressModel(submission)
  }
}
