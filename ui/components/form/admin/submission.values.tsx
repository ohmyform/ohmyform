import { Descriptions, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormPagerFragment } from '../../../graphql/fragment/form.pager.fragment'
import {
  SubmissionFragment,
  SubmissionFragmentField,
} from '../../../graphql/fragment/submission.fragment'

interface Props {
  form: FormPagerFragment
  submission: SubmissionFragment
}

export const SubmissionValues: React.FC<Props> = (props) => {
  const { t } = useTranslation()

  const columns: ColumnsType<SubmissionFragmentField> = [
    {
      title: t('submission:field'),
      render(_, row) {
        if (row.field) {
          return `${row.field.title}${row.field.required ? '*' : ''}`
        }

        return `${row.id}`
      },
    },
    {
      title: t('submission:value'),
      render(_, row) {
        console.log('row.value', row.value)

        try {
          const data = JSON.parse(row.value) as { value: string }

          if (Array.isArray(data.value)) {
            return (
              <ul>
                {data.value.map(r => (
                  <li key={r}>{JSON.stringify(r)}</li>
                ))}
              </ul>
            )
          }
          return data.value
        } catch (e) {
          return row.value
        }
      },
    },
  ]

  return (
    <div>
      <Descriptions title={t('submission:submission')}>
        <Descriptions.Item label={t('submission:country')}>
          {props.submission.geoLocation.country}
        </Descriptions.Item>
        <Descriptions.Item label={t('submission:city')}>
          {props.submission.geoLocation.city}
        </Descriptions.Item>
        <Descriptions.Item label={t('submission:device.type')}>
          {props.submission.device.type}
        </Descriptions.Item>
        <Descriptions.Item label={t('submission:device.name')}>
          {props.submission.device.name}
        </Descriptions.Item>
      </Descriptions>

      <Table columns={columns} dataSource={props.submission.fields} rowKey={'id'} />
    </div>
  )
}
