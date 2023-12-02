import { SetMetadata } from '@nestjs/common'
import { rolesType } from '../config/roles'

export const Roles = (...roles: rolesType) => SetMetadata('roles', roles);
