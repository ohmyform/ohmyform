import { gql } from '@apollo/client/core'

export interface AdminStatisticQueryData {
  forms: {
    total: number
  }
  submissions: {
    total: number
  }
  users: {
    total: number
  }
}

export interface AdminStatisticQueryVariables {}

export const ADMIN_STATISTIC_QUERY = gql`
  query statistics {
    forms: getFormStatistic {
      total
    }
    submissions: getSubmissionStatistic {
      total
    }
    users: getUserStatistic {
      total
    }
  }
`
