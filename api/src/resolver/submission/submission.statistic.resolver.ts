import { ResolveField, Resolver } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'
import { Roles } from '../../decorator/roles.decorator'
import { SubmissionStatisticModel } from '../../dto/submission/submission.statistic.model'
import { SubmissionStatisticService } from '../../service/submission/submission.statistic.service'

@Resolver(() => SubmissionStatisticModel)
export class SubmissionStatisticResolver {
  constructor(
    private readonly statisticService: SubmissionStatisticService,
  ) {
  }

  @ResolveField(() => GraphQLInt)
  @Roles('admin')
  total(): Promise<number> {
    return this.statisticService.getTotal()
  }
}
