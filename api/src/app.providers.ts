import { commands } from './command'
import { guards } from './guard'
import { resolvers } from './resolver'
import { services } from './service'

export const providers = [
  ...resolvers,
  ...commands,
  ...services,
  ...guards,
]
