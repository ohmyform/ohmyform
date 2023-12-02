import { ErrorPage } from 'components/error.page'
import { LoadingPage } from 'components/loading.page'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CardLayout } from '../../../components/form/layouts/card'
import { SliderLayout } from '../../../components/form/layouts/slider'
import { useSubmission } from '../../../components/use.submission'
import { useFormPublicQuery } from '../../../graphql/query/form.public.query'

const Index: NextPage = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const submission = useSubmission(router.query.id as string)

  const { loading, data, error } = useFormPublicQuery({
    variables: {
      id: router.query.id as string,
    },
  })

  useEffect(() => {
    // check form language to switch to!
    if (!data) {
      return
    }

    if (i18n.language !== data.form.language) {
      // TODO prompt for language change if is not a match!
      i18n
        .changeLanguage(data.form.language)
        .catch((e: Error) => console.error('failed to change language', e))
    }
  }, [data])

  if (loading) {
    return <LoadingPage message={t('form:build')} />
  }

  if (error) {
    return <ErrorPage />
  }

  switch (data.form.design.layout) {
    case 'card':
      return <CardLayout form={data.form} submission={submission} />

    case 'slider':
    default:
      return <SliderLayout form={data.form} submission={submission} />
  }
}

export default Index
