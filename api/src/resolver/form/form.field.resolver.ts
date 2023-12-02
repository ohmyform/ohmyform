import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { FormFieldLogicModel } from '../../dto/form/form.field.logic.model'
import { FormFieldModel } from '../../dto/form/form.field.model'
import { FormFieldOptionModel } from '../../dto/form/form.field.option.model'
import { FormFieldRatingModel } from '../../dto/form/form.field.rating.model'
import { FormFieldEntity } from '../../entity/form.field.entity'
import { IdService } from '../../service/id.service'
import { ContextCache } from '../context.cache'

@Resolver(FormFieldModel)
export class FormFieldResolver {
  constructor(
    private readonly idService: IdService,
  ) {
  }

  @ResolveField(() => [FormFieldOptionModel])
  async options(
    @Parent() parent: FormFieldModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormFieldOptionModel[]> {
    const field = await cache.get<FormFieldEntity>(cache.getCacheKey(
      FormFieldEntity.name,
      parent._id
    ))

    if (!field.options) {
      return []
    }

    return field.options.map(option => new FormFieldOptionModel(
      this.idService.encode(option.id),
      option,
    ))
  }

  @ResolveField(() => [FormFieldLogicModel])
  async logic(
    @Parent() parent: FormFieldModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormFieldLogicModel[]> {
    const field = await cache.get<FormFieldEntity>(cache.getCacheKey(
      FormFieldEntity.name,
      parent._id
    ))

    if (!field.logic) {
      return []
    }

    return field.logic.map(logic => new FormFieldLogicModel(
      this.idService.encode(logic.id),
      logic,
    ))
  }

  @ResolveField(() => FormFieldRatingModel, { nullable: true })
  async rating(
    @Parent() parent: FormFieldModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormFieldRatingModel> {
    const field = await cache.get<FormFieldEntity>(cache.getCacheKey(
      FormFieldEntity.name,
      parent._id
    ))

    if (!field.rating) {
      return null
    }

    return new FormFieldRatingModel(field.rating)
  }
}
