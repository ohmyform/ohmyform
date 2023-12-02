import React from 'react'
import { useSettingsQuery } from '../graphql/query/settings.query'
import scss from './omf.module.scss'

export const Omf: React.FC = () => {
  const { data, loading } = useSettingsQuery()

  if (loading || (data && data.hideContrib.value)) {
    return null
  }

  return (
    <a className={scss.badge} href="https://ohmyform.com" target={'_blank'} rel={'noreferrer'}>
      <span>OhMyForm</span>
      <span>Fork & Support!</span>
    </a>
  )
}
