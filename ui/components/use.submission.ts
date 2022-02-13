import { useMutation } from '@apollo/client'
import debug from 'debug'
import { useCallback, useEffect, useState } from 'react'
import {
  SUBMISSION_SET_FIELD_MUTATION,
  SubmissionSetFieldMutationData,
  SubmissionSetFieldMutationVariables,
} from '../graphql/mutation/submission.set.field.mutation'
import {
  SUBMISSION_START_MUTATION,
  SubmissionStartMutationData,
  SubmissionStartMutationVariables,
} from '../graphql/mutation/submission.start.mutation'
import {
  SUBMISSION_FINISH_MUTATION,
  SubmissionFinishMutationData,
  SubmissionFinishMutationVariables,
} from '../graphql/mutation/submission.finish.mutation'

const logger = debug('useSubmission')

export interface Submission {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setField: (fieldId: string, data: unknown) => Promise<void>
  finish: () => Promise<void>
}

export const useSubmission = (formId: string): Submission => {
  const [submission, setSubmission] = useState<{ id: string; token: string }>()

  const [start] = useMutation<SubmissionStartMutationData, SubmissionStartMutationVariables>(
    SUBMISSION_START_MUTATION
  )
  const [save] = useMutation<SubmissionSetFieldMutationData, SubmissionSetFieldMutationVariables>(
    SUBMISSION_SET_FIELD_MUTATION
  )
  const [submit] = useMutation<SubmissionFinishMutationData, SubmissionFinishMutationVariables>(
    SUBMISSION_FINISH_MUTATION
  )

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token = [...Array(40)].map(() => Math.random().toString(36)[2]).join('')

    start({
      variables: {
        form: formId,
        submission: {
          token,
          device: {
            name: /Mobi/i.test(window.navigator.userAgent) ? 'mobile' : 'desktop',
            type: window.navigator.userAgent,
          },
        },
      },
    })
      .then(({ data }) => {
        logger('submission id = %O', data.submission.id)
        setSubmission({
          id: data.submission.id,
          token,
        })
      })
      .catch((e: Error) => logger('failed to start submission %J', e))
  }, [formId])

  const setField = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (fieldId: string, data: any) => {
      logger('save field id=%O %O', fieldId, data)
      await save({
        variables: {
          submission: submission.id,
          field: {
            token: submission.token,
            field: fieldId,
            data: JSON.stringify(data),
          },
        },
      })
    },
    [submission]
  )

  const finish = useCallback(async () => {
    logger('finish submission!!', formId)
    await submit({
      variables: {
        submission: submission.id,
      },
    })
  }, [submission])

  return {
    setField,
    finish,
  }
}
