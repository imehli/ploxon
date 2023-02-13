import Styles from './header-styles.scss'
import { Logo, currentAccountState } from '@/presentation/components'
import { useLogout } from '@/presentation/hooks'

import { useRecoilValue } from 'recoil'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Link data-testid="login-link" to="/">
          <Logo />
        </Link>
        <div className={Styles.logoutWrap}>
          <Link data-testid="account-link" to="/account">
            <span data-testid="username">{getCurrentAccount().name}</span><br/><br/>
          </Link>
          <a data-testid="logout" href="#" onClick={buttonClick}>QUIT</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
