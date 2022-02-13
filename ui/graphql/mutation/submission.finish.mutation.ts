import { gql } from '@apollo/client/core'

export interface SubmissionFinishMutationData {
  submission: {
    id: string
    percentageComplete: string
  }
}

export interface SubmissionFinishMutationVariables {
  submission: string
}

export const SUBMISSION_FINISH_MUTATION = gql`
  mutation submissionFinish($submission: ID!) {
    submission: submissionFinish(submission: $submission) {
      id
      percentageComplete
    }
  }
`
