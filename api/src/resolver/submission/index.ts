import { SubmissionFieldResolver } from './submission.field.resolver'
import { SubmissionListQuery } from './submission.list.query'
import { SubmissionProgressResolver } from './submission.progress.resolver'
import { SubmissionQuery } from './submission.query'
import { SubmissionResolver } from './submission.resolver'
import { SubmissionSetFieldMutation } from './submission.set.field.mutation'
import { SubmissionStartMutation } from './submission.start.mutation'
import { SubmissionStatisticQuery } from './submission.statistic.query'
import { SubmissionStatisticResolver } from './submission.statistic.resolver'
import { SubmissionFinishMutation } from './submission.finish.mutation'

export const submissionResolvers = [
  SubmissionFieldResolver,
  SubmissionListQuery,
  SubmissionProgressResolver,
  SubmissionQuery,
  SubmissionResolver,
  SubmissionSetFieldMutation,
  SubmissionFinishMutation,
  SubmissionStartMutation,
  SubmissionStatisticQuery,
  SubmissionStatisticResolver,
]
