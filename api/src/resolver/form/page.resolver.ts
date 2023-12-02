import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ButtonModel } from '../../dto/form/button.model'
import { FormModel } from '../../dto/form/form.model'
import { PageModel } from '../../dto/form/page.model'
import { PageEntity } from '../../entity/page.entity'
import { IdService } from '../../service/id.service'
import { ContextCache } from '../context.cache'

@Resolver(() => PageModel)
export class PageResolver {
  constructor(
    private readonly idService: IdService,
  ) {
  }

  @ResolveField(() => [ButtonModel])
  async buttons(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<ButtonModel[]> {
    if (!parent._id) {
      return []
    }

    const page = await cache.get<PageEntity>(cache.getCacheKey(PageEntity.name, parent._id))

    return page.buttons.map(button => new ButtonModel(
      this.idService.encode(button.id),
      button
    ))
  }
}
