import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Query } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { FormModel } from '../../dto/form/form.model'
import { FormEntity } from '../../entity/form.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormService } from '../../service/form/form.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class FormQuery {
  constructor(
    private readonly formService: FormService,
  ) {
  }

  @Query(() => FormModel)
  async getFormById(
    @User() user: UserEntity,
    @Args('id', {type: () => ID}) id,
    @Context('cache') cache: ContextCache,
  ): Promise<FormModel> {
    const form = await this.formService.findById(id)

    if (!form.isLive && !this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    cache.add(cache.getCacheKey(FormEntity.name, form.id), form)

    return new FormModel(form)
  }
}
