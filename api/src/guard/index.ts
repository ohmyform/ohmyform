import { APP_GUARD } from '@nestjs/core'
import { GqlAuthGuard } from './gql.auth.guard'
import { LocalAuthGuard } from './local.auth.guard'
import { RolesGuard } from './roles.guard'

export const guards = [
  {
    provide: APP_GUARD,
    useClass: GqlAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  LocalAuthGuard,
]
