import Styles from './back-to-top-styles.scss'

import React, { useState, useEffect } from 'react'
import { MdKeyboardArrowUp } from 'react-icons/md'

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    // cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = (): void => {
    if (window.pageYOffset < 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={ isVisible ? Styles.backToTop : Styles.backToTopVisible } onClick={scrollToTop}>
      <MdKeyboardArrowUp className={Styles.up} />
    </div>
  )
}

export default BackToTopButton
