import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'

interface Data {
  status: {
    version: string
  }
}

const QUERY = gql`
  query status {
    status {
      version
    }
  }
`

export const useStatusQuery = (
  options?: QueryHookOptions<Data, unknown>
): QueryResult<Data, unknown> => useQuery<Data, unknown>(QUERY, options)
