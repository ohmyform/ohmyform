import { formPipes } from './form'
import { submissionPipes } from './submission'
import { userPipes } from './user'

export const pipes = [
  ...formPipes,
  ...submissionPipes,
  ...userPipes,
]
