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
import scss from './page.module.scss'

interface Props {
  page: FormPublicPageFragment
  design: FormPublicDesignFragment
  className?: string

  next: () => void
  prev: () => void
}

export const FormPage: React.FC<Props> = ({ page, design, next, prev, className, ...props }) => {
  const { t } = useTranslation()

  if (!page.show) {
    return null
  }

  return (
    <div className={[scss.main, className].filter((c) => !!c).join(' ')} {...props}>
      <div className={scss.content}>
        <StyledH1 design={design} type={'question'}>
          {page.title}
        </StyledH1>
        <StyledMarkdown design={design} type={'question'}>{page.paragraph}</StyledMarkdown>
      </div>
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
            {t('form:previous')}
          </StyledButton>
        )}
        <PageButtons buttons={page.buttons} />

        <div style={{ flex: 1 }} />

        <StyledButton
          background={design.colors.button}
          color={design.colors.buttonText}
          highlight={design.colors.buttonActive}
          size={'large'}
          onClick={next}
        >
          {page.buttonText || t('form:continue')}
        </StyledButton>
      </div>
    </div>
  )
}
