import { Injectable } from '@nestjs/common'
import { Args, ID, Mutation } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { DeletedModel } from '../../dto/deleted.model'
import { UserEntity } from '../../entity/user.entity'
import { UserByIdPipe } from '../../pipe/user/user.by.id.pipe'
import { IdService } from '../../service/id.service'
import { UserDeleteService } from '../../service/user/user.delete.service'

@Injectable()
export class UserDeleteMutation {
  constructor(
    private readonly deleteService: UserDeleteService,
    private readonly idService: IdService,
  ) {
  }

  @Mutation(() => DeletedModel)
  @Roles('admin')
  async deleteUser(
    @User() auth: UserEntity,
    @Args({ name: 'id', type: () => ID}, UserByIdPipe) user: UserEntity,
  ): Promise<DeletedModel> {
    if (auth.id === user.id) {
      throw new Error('cannot delete your own user')
    }

    await this.deleteService.delete(user.id)

    return new DeletedModel(this.idService.encode(user.id))
  }
}
