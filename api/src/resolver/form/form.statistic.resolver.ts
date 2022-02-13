import { Int, ResolveField, Resolver } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { FormStatisticModel } from '../../dto/form/form.statistic.model'
import { FormStatisticService } from '../../service/form/form.statistic.service'

@Resolver(() => FormStatisticModel)
export class FormStatisticResolver {
  constructor(
    private readonly statisticService: FormStatisticService,
  ) {
  }

  @ResolveField(() => Int)
  @Roles('admin')
  total(): Promise<number> {
    return this.statisticService.getTotal()
  }
}
