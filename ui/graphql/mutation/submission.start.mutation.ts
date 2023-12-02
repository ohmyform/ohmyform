import { gql } from '@apollo/client/core'

export interface SubmissionStartMutationData {
  submission: {
    id: string
    percentageComplete: string
  }
}

export interface SubmissionStartMutationVariables {
  form: string
  submission: {
    token: string
    device: {
      type: string
      name: string
    }
  }
}

export const SUBMISSION_START_MUTATION = gql`
  mutation submissionStart($form: ID!, $submission: SubmissionStartInput!) {
    submission: submissionStart(form: $form, submission: $submission) {
      id
      percentageComplete
    }
  }
`
