import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { DesignModel } from '../../dto/form/design.model'
import { FormFieldModel } from '../../dto/form/form.field.model'
import { FormHookModel } from '../../dto/form/form.hook.model'
import { FormModel } from '../../dto/form/form.model'
import { FormNotificationModel } from '../../dto/form/form.notification.model'
import { PageModel } from '../../dto/form/page.model'
import { UserModel } from '../../dto/user/user.model'
import { FormEntity } from '../../entity/form.entity'
import { FormFieldEntity } from '../../entity/form.field.entity'
import { PageEntity } from '../../entity/page.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormService } from '../../service/form/form.service'
import { IdService } from '../../service/id.service'
import { ContextCache } from '../context.cache'

@Resolver(() => FormModel)
export class FormResolver {
  constructor(
    private readonly formService: FormService,
    private readonly idService: IdService,
  ) {
  }

  @ResolveField(() => [FormFieldModel])
  async fields(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormFieldModel[]> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent._id))

    if (!form.fields) {
      return []
    }

    return form.fields
      .sort((a,b) => a.idx - b.idx)
      .map(field => {
        cache.add(cache.getCacheKey(FormFieldEntity.name, field.id), field)

        return new FormFieldModel(
          this.idService.encode(field.id),
          field,
        )
      })
  }

  @ResolveField(() => [FormHookModel])
  @Roles('admin')
  async hooks(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormHookModel[]> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent._id))

    if (!this.formService.isAdmin(form, user)) {
      throw new Error('no access to field')
    }

    if (!form.hooks) {
      return []
    }

    return form.hooks.map(hook => new FormHookModel(
      this.idService.encode(hook.id),
      hook
    ))
  }

  @ResolveField(() => Boolean)
  @Roles('admin')
  async isLive(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<boolean> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent._id))

    if (!this.formService.isAdmin(form, user)) {
      throw new Error('no access to field')
    }

    return form.isLive
  }

  @ResolveField(() => [FormNotificationModel])
  @Roles('admin')
  async notifications(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormNotificationModel[]> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent._id))

    if (!this.formService.isAdmin(form, user)) {
      throw new Error('no access to field')
    }

    if (!form.notifications) {
      return []
    }

    return form.notifications.map(notification => new FormNotificationModel(
      this.idService.encode(notification.id),
      notification
    ))
  }

  @ResolveField(() => DesignModel)
  async design(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<DesignModel> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent._id))

    return new DesignModel(form.design)
  }

  @ResolveField(() => PageModel)
  async startPage(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<PageModel> {
    const { startPage } = await cache.get<FormEntity>(cache.getCacheKey(
      FormEntity.name,
      parent._id
    ))

    if (startPage) {
      cache.add(cache.getCacheKey(PageEntity.name, startPage.id), startPage)

      return new PageModel(
        this.idService.encode(startPage.id),
        startPage
      )
    }

    return new PageModel(Math.random().toString())
  }

  @ResolveField(() => PageModel)
  async endPage(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<PageModel> {
    const { endPage } = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent._id))

    if (endPage) {
      cache.add(cache.getCacheKey(PageEntity.name, endPage.id), endPage)

      return new PageModel(
        this.idService.encode(endPage.id),
        endPage
      )
    }

    return new PageModel(Math.random().toString())
  }

  @ResolveField(() => UserModel, { nullable: true })
  @Roles('admin')
  async admin(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<UserModel> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent._id))

    if (!form.admin) {
      return null
    }

    return new UserModel(this.idService.encode(form.admin.id), form.admin)
  }
}
