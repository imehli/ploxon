import Styles from './account-informations-styles.scss'
import { Error, Header, Footer } from '@/presentation/components'
import { LoadAccountInformations } from '@/domain/usecases'
import { AccountInformationsList, accountInformationsState } from '@/presentation/pages/account-informations/components'

import React, { useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { useErrorHandler } from '@/presentation/hooks'
import { useTranslation } from 'react-i18next'

type Props = {
  loadAccountInformations: LoadAccountInformations
}

const AccountInformations: React.FC<Props> = ({ loadAccountInformations }: Props) => {
  const resetAccountInformationsState = useResetRecoilState(accountInformationsState)
  const [state, setState] = useRecoilState(accountInformationsState)
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })
  const reload = (): void => setState(old => ({ accountInformations: null, error: '', reload: !old.reload }))
  const { t } = useTranslation()

  useEffect(() => resetAccountInformationsState(), [])
  useEffect(() => {
    loadAccountInformations.loadAll()
      .then(accountInformations => setState(old => ({ ...old, accountInformations })))
      .catch(handleError)
  }, [state.reload])
  return (
    <div className={Styles.userInformationsWrap}>
      <Header />
      <div className={Styles.userInformationsSection}>
        <h1>{t('accountInformation.header')}</h1>
          {state.error
            ? <Error error={state.error} reload={reload} />
            : <AccountInformationsList accountInformations={state.accountInformations} />
          }
      </div>
      <Footer />
    </div>
  )
}

export default AccountInformations
