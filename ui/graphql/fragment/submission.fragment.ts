import { gql } from '@apollo/client/core'

interface SubmissionFragmentFormField {
  title: string
  required: boolean
}

export interface SubmissionFragmentField {
  id: string
  value: string
  type: string

  field?: SubmissionFragmentFormField
}

export interface SubmissionFragment {
  id: string
  created: string
  lastModified?: string
  percentageComplete: number
  timeElapsed: number
  geoLocation: {
    country: string
    city: string
  }
  device: {
    type: string
    name: string
  }

  fields: SubmissionFragmentField[]
}

export const SUBMISSION_FRAGMENT = gql`
  fragment Submission on Submission {
    id
    created
    lastModified
    percentageComplete
    timeElapsed
    geoLocation {
      country
      city
    }
    device {
      type
      name
    }

    fields {
      id
      value
      type

      field {
        title
        required
      }
    }
  }
`
