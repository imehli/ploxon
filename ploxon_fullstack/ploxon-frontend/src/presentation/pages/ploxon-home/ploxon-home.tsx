import Styles from './ploxon-home-styles.scss'
import { Footer, PloxonHomeHeader, LanguageSwitcher } from '@/presentation/components'
import { menuState } from '@/presentation/components/language-switcher/atoms'

import { useRecoilValue } from 'recoil'

import React from 'react'
import { PloxonHomeMainContent } from './components'

const PloxonHome: React.FC = () => {
  const active = useRecoilValue(menuState)

  return (
    <div className={active ? Styles.ploxonHomeWrap : Styles.languageSwitcherWrap}>
      {active
        ? <>
            <PloxonHomeHeader />
            <PloxonHomeMainContent />
            <Footer />
          </>
        : <LanguageSwitcher />
      }
    </div>
  )
}

export default PloxonHome
