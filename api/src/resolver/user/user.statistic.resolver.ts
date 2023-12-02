import { Int, ResolveField, Resolver } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { UserStatisticModel } from '../../dto/user/user.statistic.model'
import { UserStatisticService } from '../../service/user/user.statistic.service'

@Resolver(() => UserStatisticModel)
export class UserStatisticResolver {
  constructor(
    private readonly statisticService: UserStatisticService,
  ) {
  }

  @ResolveField(() => Int)
  @Roles('admin')
  total(): Promise<number> {
    return this.statisticService.getTotal()
  }
}
