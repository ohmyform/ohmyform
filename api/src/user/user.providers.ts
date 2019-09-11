import { UserService } from "./services/user.service"
import { UsernameAlreadyInUse } from "./validators/UsernameAlreadyInUse"
import { EmailAlreadyInUse } from "./validators/EmailAlreadyInUse"
import { InitService } from "./services/init.service"

export default [
  InitService,
  UserService,
  UsernameAlreadyInUse,
  EmailAlreadyInUse,
]
