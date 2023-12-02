import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'
import { PasswordService } from './password.service'

export const authServices = [
  AuthService,
  LocalStrategy,
  PasswordService,
  JwtStrategy,
]
