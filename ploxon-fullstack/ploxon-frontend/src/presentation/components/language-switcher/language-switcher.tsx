import Styles from './language-switcher-styles.scss'
import { languageState, menuState } from './atoms'

import { useRecoilState } from 'recoil'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { GrLanguage } from 'react-icons/gr'
import { FaTimes } from 'react-icons/fa'

const LanguageSwitcher: React.FC = () => {
  const [language, setLanguage] = useRecoilState(languageState)
  const [active, setActive] = useRecoilState(menuState)
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  const click = (): void => {
    setActive(active => !active)
  }

  const setFr = (): void => {
    setLanguage('fr')
    localStorage.setItem('lng', JSON.stringify('fr'))
    setActive(active => !active)
  }
  const setEn = (): void => {
    setLanguage('en')
    localStorage.setItem('lng', JSON.stringify('en'))
    setActive(active => !active)
  }

  return (
    <div data-testid="languageSwitcher" className={Styles.languageSwitcherWrap}>
      {active
        ? <button onClick={() => click()}>
            <GrLanguage className={Styles.toggle}/>
          </button>
        : <div className={Styles.navMenu}>
            <div className={Styles.closeButton}>
              <button className={Styles.closeButton} onClick={() => click()}>
                <div><FaTimes /></div>
              </button>
            </div>
            <div className={Styles.buttonsWrap}>
              <div className={Styles.buttonsContent}>
                <div className={Styles.divLang}><button onClick={() => setEn()}><div className={Styles.langText}>English</div></button></div>
                <div className={Styles.divLang}><button onClick={() => setFr()}><div className={Styles.langText}>Français</div></button></div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default LanguageSwitcher
