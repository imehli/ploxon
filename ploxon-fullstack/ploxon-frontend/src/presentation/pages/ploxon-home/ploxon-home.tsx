import Styles from './ploxon-home-styles.scss'
import { Footer, PloxonHomeHeader } from '@/presentation/components'

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
