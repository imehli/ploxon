import Styles from './ploxon-home-styles.scss'
import { Footer, PloxonHomeHeader, LanguageSwitcher } from '@/presentation/components'
import { menuState } from '@/presentation/components/language-switcher/atoms'
import { useRecoilValue } from 'recoil'

import React from 'react'
import { PloxonHomeMainContent } from './components'

const PloxonHome: React.FC = () => {
  return (
    <div className={Styles.ploxonHomeWrap}>
      <>
        <PloxonHomeHeader />
        <PloxonHomeMainContent />
        <Footer />
      </>
    </div>
  )
}

export default PloxonHome
