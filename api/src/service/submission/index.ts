import { SubmissionHookService } from './submission.hook.service'
import { SubmissionNotificationService } from './submission.notification.service'
import { SubmissionService } from './submission.service'
import { SubmissionSetFieldService } from './submission.set.field.service'
import { SubmissionStartService } from './submission.start.service'
import { SubmissionStatisticService } from './submission.statistic.service'
import { SubmissionTokenService } from './submission.token.service'

export const submissionServices = [
  SubmissionHookService,
  SubmissionNotificationService,
  SubmissionService,
  SubmissionSetFieldService,
  SubmissionStartService,
  SubmissionStatisticService,
  SubmissionTokenService,
]
