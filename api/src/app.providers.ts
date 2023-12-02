import { commands } from './command'
import { guards } from './guard'
import { pipes } from './pipe'
import { resolvers } from './resolver'
import { services } from './service'

export const providers = [
  ...commands,
  ...guards,
  ...pipes,
  ...resolvers,
  ...services,
]
