import Styles from './ploxon-home-main-content-styles.scss'

import React from 'react'
import { LinkText } from '@/presentation/components'
import { useTranslation, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

const PloxonHomeMainContent: React.FC = () => {
  const { t } = useTranslation()
  const LINK_PLOXON_GITHUP_REPOSITORY = 'https://github.com/imehli/ploxon'

  return (
    <div>
        <section data-testid="ploxon-home" className={Styles.firstSection}>
            <div className={Styles.firstSectionContent}>
                <h1>PLOXON</h1>
                <p className={Styles.slogan}>The Art and Science of Management !</p>
                <div className={Styles.firstSectionMenu}>
                    <div className={Styles.menuOptions}><Link data-testid="login-link" to="/login"><p>{t('navigation.signin')}</p></Link></div>
                    <div className={Styles.menuOptions}><Link data-testid="signup-link" to="/signup"><p>{t('navigation.signup')}</p></Link></div>
                    <div className={Styles.menuOptions}><a href="#secondSection"><p>Informations</p></a></div>
                    <div className={Styles.menuOptions}><a href={LINK_PLOXON_GITHUP_REPOSITORY} target="_blank" rel="noreferrer"><p>Github</p></a></div>
                </div>
            </div>
        </section>
        <section id="secondSection" data-testid="ploxon-home2" className={Styles.secondSection}>
            <h1>
                {t('greeting.hello')}
            </h1>
            <article>
                <div>
                    {t('ploxon_description.description.div1')}
                </div>
                <div>
                    {t('ploxon_description.description.div2')}
                </div>
                <div>
                    {t('ploxon_description.description.div3')}
                </div>
            </article>
            <h1>
                {t('ploxon_description.dao.title')}
            </h1>
            <article>
                <div>
                    {t('ploxon_description.dao.div1')}
                </div>
                <div>
                    <Trans
                        i18nKey="ploxon_description.dao.div2"
                        components={{
                          LINK_PLOXON_GITHUP_REPOSITORY: <LinkText to={LINK_PLOXON_GITHUP_REPOSITORY} title="Github" />
                        }}
                    />
                </div>
            </article>
            <h1>
                {t('ploxon_description.desclaimer.title')}
            </h1>
            <article>
                <div>
                    {t('ploxon_description.desclaimer.div1')}
                </div>
                <div>
                    {t('ploxon_description.desclaimer.div2')}
                </div>
            </article>
        </section>
    </div>
  )
}

export default PloxonHomeMainContent
