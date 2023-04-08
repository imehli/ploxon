import Styles from './login-header-styles.scss'
import { Logo } from '@/presentation/components'

import { Link } from 'react-router-dom'
import React, { memo } from 'react'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <Link data-testid="ploxonHome-link" replace to="/">
        <Logo />
      </Link>
      <h1>The Art and Science of Management !</h1>
    </header>
  )
}

export default memo(LoginHeader)
