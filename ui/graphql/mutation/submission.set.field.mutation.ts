import { gql } from '@apollo/client/core'

export interface SubmissionSetFieldMutationData {
  submission: {
    id: string
    percentageComplete: string
  }
}

export interface SubmissionSetFieldMutationVariables {
  submission: string
  field: {
    token: string
    field: string
    data: string
  }
}

export const SUBMISSION_SET_FIELD_MUTATION = gql`
  mutation submissionSetField($submission: ID!, $field: SubmissionSetFieldInput!) {
    submission: submissionSetField(submission: $submission, field: $field) {
      id
      percentageComplete
    }
  }
`
