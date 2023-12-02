import { Card } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  FormPublicDesignFragment,
  FormPublicPageFragment,
} from '../../../../graphql/fragment/form.public.fragment'
import { StyledButton } from '../../../styled/button'
import { StyledH1 } from '../../../styled/h1'
import { StyledMarkdown } from '../../../styled/markdown'
import { PageButtons } from '../page.buttons'

interface Props {
  page: FormPublicPageFragment
  design: FormPublicDesignFragment

  next?: () => void
  prev?: () => void
}

export const Page: React.FC<Props> = ({ design, page, next, prev }) => {
  const { t } = useTranslation()

  return (
    <Card>
      <StyledH1 design={design} type={'question'}>
        {page.title}
      </StyledH1>
      <StyledMarkdown design={design} type={'question'}>{page.paragraph}</StyledMarkdown>

      <div
        style={{
          padding: 32,
          display: 'flex',
        }}
      >
        {prev && (
          <StyledButton
            background={design.colors.button}
            color={design.colors.buttonText}
            highlight={design.colors.buttonActive}
            onClick={prev}
          >
            {t('form:restart')}
          </StyledButton>
        )}
        <PageButtons buttons={page.buttons} />

        <div style={{ flex: 1 }} />

        {next && (
          <StyledButton
            background={design.colors.button}
            color={design.colors.buttonText}
            highlight={design.colors.buttonActive}
            size={'large'}
            onClick={next}
          >
            {page.buttonText || t('form:continue')}
          </StyledButton>
        )}
      </div>
    </Card>
  )
}
