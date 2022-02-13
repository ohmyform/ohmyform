import { authServices } from './auth'
import { formResolvers } from './form'
import { profileResolvers } from './profile'
import { settingsResolvers } from './setting'
import { StatusResolver } from './status.resolver'
import { submissionResolvers } from './submission'
import { userResolvers } from './user'

export const resolvers = [
  StatusResolver,
  ...userResolvers,
  ...authServices,
  ...profileResolvers,
  ...formResolvers,
  ...submissionResolvers,
  ...settingsResolvers,
]
