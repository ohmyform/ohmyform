import { gql } from '@apollo/client/core'

export const SUBMISSION_FINISH_MUTATION = gql`
  mutation submissionSetField($submission: ID!, $field: SubmissionSetFieldInput!) {
    submission: submissionSetField(submission: $submission, field: $field) {
      id
      percentageComplete
    }
  }
`
