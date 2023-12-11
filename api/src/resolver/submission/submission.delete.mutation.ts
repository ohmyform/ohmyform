import { Injectable } from '@nestjs/common'
import { Args, ID, Mutation } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { DeletedModel } from '../../dto/deleted.model'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { SubmissionByIdPipe } from '../../pipe/submission/submission.by.id.pipe'
import { FormService } from '../../service/form/form.service'
import { IdService } from '../../service/id.service'
import { SubmissionDeleteService } from '../../service/submission/submission.delete.service'

@Injectable()
export class SubmissionDeleteMutation {
  constructor(
    private readonly formService: FormService,
    private readonly deleteService: SubmissionDeleteService,
    private readonly idService: IdService,
  ) {
  }

  @Mutation(() => DeletedModel)
  async submissionDelete(
    @User() user: UserEntity,
    @Args({ name: 'id', type: () => ID }, SubmissionByIdPipe) submission: SubmissionEntity,
  ): Promise<DeletedModel> {
    if (!this.formService.isAdmin(submission.form, user)) {
      throw new Error('invalid form')
    }

    await this.deleteService.delete(submission.id)

    return new DeletedModel(this.idService.encode(submission.id))
  }
}
