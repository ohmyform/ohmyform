import { Descriptions, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormPagerFragment } from '../../../graphql/fragment/form.pager.fragment'
import {
  SubmissionFieldFragment,
  SubmissionFragment,
} from '../../../graphql/fragment/submission.fragment'
import { fieldTypes } from '../types'

interface Props {
  form: FormPagerFragment
  submission: SubmissionFragment
}

export const SubmissionValues: React.FC<Props> = (props) => {
  const { t } = useTranslation()

  const columns: ColumnsType<SubmissionFieldFragment> = [
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
        try {
          return fieldTypes[row.type]?.displayValue(row.value)
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
