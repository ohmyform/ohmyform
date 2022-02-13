import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { SubmissionFieldModel } from '../../dto/submission/submission.field.model'
import { SubmissionModel } from '../../dto/submission/submission.model'
import { SubmissionEntity } from '../../entity/submission.entity'
import { SubmissionFieldEntity } from '../../entity/submission.field.entity'
import { UserEntity } from '../../entity/user.entity'
import { ContextCache } from '../context.cache'

@Resolver(() => SubmissionModel)
export class SubmissionResolver {
  @ResolveField(() => [SubmissionFieldModel])
  async fields(
    @User() user: UserEntity,
    @Parent() parent: SubmissionModel,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionFieldModel[]> {
    const submission = await cache.get<SubmissionEntity>(
      cache.getCacheKey(SubmissionEntity.name, parent.id)
    )

    return submission.fields.map(field => {
      cache.add(cache.getCacheKey(SubmissionFieldEntity.name, field.id), field)
      return new SubmissionFieldModel(field)
    })
  }
}
