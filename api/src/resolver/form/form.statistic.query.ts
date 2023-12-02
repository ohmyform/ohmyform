import { Injectable } from '@nestjs/common'
import { Query } from '@nestjs/graphql'
import { FormStatisticModel } from '../../dto/form/form.statistic.model'

@Injectable()
export class FormStatisticQuery {
  @Query(() => FormStatisticModel)
  getFormStatistic(): FormStatisticModel {
    return new FormStatisticModel()
  }
}
