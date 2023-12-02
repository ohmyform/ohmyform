import { Query, Resolver } from '@nestjs/graphql'
import { StatusModel } from '../dto/status.model'

@Resolver(() => StatusModel)
export class StatusResolver {
  @Query(() => StatusModel)
  status(): StatusModel {
    return new StatusModel({
      version: process.env.version || 'dev',
    })
  }
}
