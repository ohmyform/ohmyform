import { Injectable } from '@nestjs/common'
import { Args, ID, Mutation } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { DeletedModel } from '../../dto/deleted.model'
import { UserEntity } from '../../entity/user.entity'
import { FormDeleteService } from '../../service/form/form.delete.service'
import { FormService } from '../../service/form/form.service'

@Injectable()
export class FormDeleteMutation {
  constructor(
    private readonly deleteService: FormDeleteService,
    private readonly formService: FormService,
  ) {
  }

  @Mutation(() => DeletedModel)
  @Roles('admin')
  async deleteForm(
    @User() user: UserEntity,
    @Args({ name: 'id', type: () => ID}) id: string,
  ): Promise<DeletedModel> {
    const form = await this.formService.findById(id)

    if (!form.isLive && !this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    await this.deleteService.delete(id)

    return new DeletedModel(id)
  }
}
