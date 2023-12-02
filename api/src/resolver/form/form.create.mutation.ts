import { Injectable } from '@nestjs/common'
import { Args, Context, Mutation } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { FormCreateInput } from '../../dto/form/form.create.input'
import { FormModel } from '../../dto/form/form.model'
import { FormEntity } from '../../entity/form.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormCreateService } from '../../service/form/form.create.service'
import { IdService } from '../../service/id.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class FormCreateMutation {
  constructor(
    private readonly createService: FormCreateService,
    private readonly idService: IdService,
  ) {
  }

  @Mutation(() => FormModel)
  @Roles('admin')
  async createForm(
    @User() user: UserEntity,
    @Args({ name: 'form', type: () => FormCreateInput }) input: FormCreateInput,
    @Context('cache') cache: ContextCache,
  ): Promise<FormModel> {
    const form = await this.createService.create(user, input)

    cache.add(cache.getCacheKey(FormEntity.name, form.id), form)

    return new FormModel(this.idService.encode(form.id), form)
  }
}
