import Styles from './ploxon-home-styles.scss'
import { Footer, PloxonHomeHeader, BackToTopButton } from '@/presentation/components'

import React from 'react'
import { PloxonHomeMainContent } from './components'

const PloxonHome: React.FC = () => {
  return (
    <div className={Styles.ploxonHomeWrap}>
      <>
        <PloxonHomeHeader />
        <PloxonHomeMainContent />
        <BackToTopButton />
        <Footer />
      </>
    </div>
  )
}

export default PloxonHome
