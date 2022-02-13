import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { useImperativeQuery } from '../../components/use.imerative.query'
import { FORM_PAGER_FRAGMENT, FormPagerFragment } from '../fragment/form.pager.fragment'
import { SUBMISSION_FRAGMENT, SubmissionFragment } from '../fragment/submission.fragment'

interface Data {
  pager: {
    entries: SubmissionFragment[]

    total: number
    limit: number
    start: number
  }

  form: FormPagerFragment
}

interface Variables {
  form: string
  start?: number
  limit?: number
}

const QUERY = gql`
  query listSubmissions($form: ID!, $start: Int, $limit: Int) {
    form: getFormById(id: $form) {
      ...PagerForm
    }

    pager: listSubmissions(form: $form, start: $start, limit: $limit) {
      entries {
        ...Submission
      }
      total
      limit
      start
    }
  }

  ${SUBMISSION_FRAGMENT}
  ${FORM_PAGER_FRAGMENT}
`

export const useSubmissionPagerQuery = (
  options?: QueryHookOptions<Data, Variables>
): QueryResult<Data, Variables> => useQuery<Data, Variables>(QUERY, options)

export const useSubmissionPagerImperativeQuery = () => useImperativeQuery<Data, Variables>(QUERY)
