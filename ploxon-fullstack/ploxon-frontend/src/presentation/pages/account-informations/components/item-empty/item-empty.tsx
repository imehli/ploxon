import React from 'react'
import { useTranslation } from 'react-i18next'

const AccountInformationsItemEmpty: React.FC = () => {
  const { t } = useTranslation()
  return (
    <p>{t('accountInformation.loading')}</p>
  )
}

export default AccountInformationsItemEmpty
