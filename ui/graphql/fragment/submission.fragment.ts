import { gql } from '@apollo/client/core'

interface FormFieldSubmissionFragment {
  id: string
  title: string
  required: boolean
}

export interface SubmissionFieldFragment {
  id: string
  value: string
  type: string

  field?: FormFieldSubmissionFragment
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

  fields: SubmissionFieldFragment[]
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
        id
        title
        required
      }
    }
  }
`
