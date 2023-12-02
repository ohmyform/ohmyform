import { Injectable } from '@nestjs/common'
import { Query } from '@nestjs/graphql'
import { SubmissionStatisticModel } from '../../dto/submission/submission.statistic.model'

@Injectable()
export class SubmissionStatisticQuery {
  @Query(() => SubmissionStatisticModel)
  getSubmissionStatistic(): SubmissionStatisticModel {
    return new SubmissionStatisticModel()
  }
}
