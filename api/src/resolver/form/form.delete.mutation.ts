import { Injectable } from '@nestjs/common'
import { Args, ID, Mutation } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { DeletedModel } from '../../dto/deleted.model'
import { FormEntity } from '../../entity/form.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormByIdPipe } from '../../pipe/form/form.by.id.pipe'
import { FormDeleteService } from '../../service/form/form.delete.service'
import { FormService } from '../../service/form/form.service'
import { IdService } from '../../service/id.service'

@Injectable()
export class FormDeleteMutation {
  constructor(
    private readonly deleteService: FormDeleteService,
    private readonly formService: FormService,
    private readonly idService: IdService,
  ) {
  }

  @Mutation(() => DeletedModel)
  @Roles('admin')
  async deleteForm(
    @User() user: UserEntity,
    @Args('id', {type: () => ID}, FormByIdPipe) form: FormEntity,
  ): Promise<DeletedModel> {
    if (!form.isLive && !this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    await this.deleteService.delete(form.id)

    return new DeletedModel(this.idService.encode(form.id))
  }
}
