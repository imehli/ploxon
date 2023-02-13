import Styles from './ploxon-home-header-styles.scss'
import { Logo, currentAccountState, LanguageSwitcher } from '@/presentation/components'

import { Link } from 'react-router-dom'
import React from 'react'
import { useRecoilValue } from 'recoil'

const PloxonHomeHeader: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  return (
    <header className={Styles.ploxonHomeHeaderWrap}>
      <div className={Styles.ploxonHomeHeaderContent}>
        <Link data-testid="login-link" to="/">
          <Logo />
        </Link>
        <div className={Styles.languagesAndAccount}>
          <LanguageSwitcher />
          <div className={Styles.loginWrap}>
            {
              getCurrentAccount()?.accessToken
                ? <Link data-testid="link" to="/account">My profile</Link>
                : <Link data-testid="login-link" to="/login" className={Styles.link}>Login</Link>
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default PloxonHomeHeader
