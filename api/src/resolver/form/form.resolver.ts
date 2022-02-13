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
import { UserEntity } from '../../entity/user.entity'
import { FormService } from '../../service/form/form.service'
import { ContextCache } from '../context.cache'

@Resolver(() => FormModel)
export class FormResolver {
  constructor(
    private readonly formService: FormService,
  ) {
  }

  @ResolveField(() => [FormFieldModel])
  async fields(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormFieldModel[]> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    return form.fields?.map(field => new FormFieldModel(field)).sort((a,b) => a.idx - b.idx) || []
  }

  @ResolveField(() => [FormHookModel])
  async hooks(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormHookModel[]> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    return form.hooks?.map(hook => new FormHookModel(hook)) || []
  }

  @ResolveField(() => Boolean)
  @Roles('admin')
  async isLive(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<boolean> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

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
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    if (!this.formService.isAdmin(form, user)) {
      throw new Error('no access to field')
    }

    return form.notifications?.map(notification => new FormNotificationModel(notification)) || []
  }

  @ResolveField(() => DesignModel)
  async design(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<DesignModel> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    return new DesignModel(form.design)
  }

  @ResolveField(() => PageModel)
  async startPage(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<PageModel> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    return new PageModel(form.startPage)
  }

  @ResolveField(() => PageModel)
  async endPage(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<PageModel> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    return new PageModel(form.endPage)
  }

  @ResolveField(() => UserModel, { nullable: true })
  @Roles('admin')
  async admin(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<UserModel> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    if (!form.admin) {
      return null
    }

    return new UserModel(form.admin)
  }
}
