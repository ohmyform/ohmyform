import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { SubmissionFieldModel } from '../../dto/submission/submission.field.model'
import { SubmissionModel } from '../../dto/submission/submission.model'
import { SubmissionEntity } from '../../entity/submission.entity'
import { SubmissionFieldEntity } from '../../entity/submission.field.entity'
import { UserEntity } from '../../entity/user.entity'
import { IdService } from '../../service/id.service'
import { ContextCache } from '../context.cache'

@Resolver(() => SubmissionModel)
export class SubmissionResolver {
  constructor(
    private readonly idService: IdService,
  ) {
  }

  @ResolveField(() => [SubmissionFieldModel])
  async fields(
    @User() user: UserEntity,
    @Parent() parent: SubmissionModel,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionFieldModel[]> {
    const submission = await cache.get<SubmissionEntity>(
      cache.getCacheKey(SubmissionEntity.name, parent._id)
    )

    return submission.fields.map(field => {
      cache.add(cache.getCacheKey(SubmissionFieldEntity.name, field.id), field)
      return new SubmissionFieldModel(this.idService.encode(field.id), field)
    })
  }
}
