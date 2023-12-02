import { Injectable } from '@nestjs/common'
import { Query } from '@nestjs/graphql'
import { UserStatisticModel } from '../../dto/user/user.statistic.model'

@Injectable()
export class UserStatisticQuery {
  @Query(() => UserStatisticModel)
  getUserStatistic(): UserStatisticModel {
    return new UserStatisticModel()
  }
}
