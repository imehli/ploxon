import Styles from './ploxon-home-main-content-styles.scss'
import tddPrincipal from './img/tdd-principal.jpg'
import gps from './img/gps.jpg'
import tddCodeExample from './img/tdd-code-example.png'
import cleanArchitecture from './img/ploxon-architecture.png'
import folderStructure from './img/ploxon-folder-structure.png'
import layersDependency from './img/layers-dependency.png'
import cleanJoin from './img/clean-join.png'
import interfaceAdapter from './img/interface-adapter-usecase-pattern.png'

import { currentAccountState , LinkText } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

const PloxonHomeMainContent: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const { t } = useTranslation()
  const LINK_GITHUP = 'https://github.com/imehli/ploxon'
  const LINK_PLOXON_GRAPHQL_API = 'https://www.ploxon.com:5050/graphql'

  return (
    <div>
        <section data-testid="ploxon-home" className={Styles.firstSection}>
            <div className={Styles.firstSectionContent}>
                <h1>PLOXON</h1>
                <p className={Styles.slogan}>The Art and Science of Management !</p>
                <div className={Styles.firstSectionMenu}>
                    {getCurrentAccount()?.accessToken
                      ? <></>

                      : <div>
                            <div className={Styles.menuOptions}><Link data-testid="login-link" to="/login"><p>{t('navigation.signin')}</p></Link></div>
                            <div className={Styles.menuOptions}><Link data-testid="signup-link" to="/signup"><p>{t('navigation.signup')}</p></Link></div>
                        </div>
                    }
                    <div className={Styles.menuOptions}><a href={LINK_GITHUP} target="_blank" rel="noreferrer"><p>Github</p></a></div>
                    <div className={Styles.menuOptions}><a href={LINK_PLOXON_GRAPHQL_API} target="_blank" rel="noreferrer"><p>{t('navigation.graphql')}</p></a></div>
                </div>
            </div>
        </section>
        <section id="secondSection" data-testid="ploxon-home2" className={Styles.secondSection}>
            <h1>{t('ploxonDescription.presentation.title')}</h1>
            <div>{t('ploxonDescription.presentation.div1')}</div>
            <article>
                <h2>{t('ploxonDescription.tdd.title')}</h2>
                <div>{t('ploxonDescription.tdd.div1')}</div>
                <div><img className={Styles.mediumImage} src={gps} alt="gps image"/></div>
                <div>{t('ploxonDescription.tdd.div2')}</div>
                <div><img className={Styles.mediumImage} src={tddPrincipal} alt="tddPrincipal image"/></div>
                <div>{t('ploxonDescription.tdd.div3')}</div>
                <div>{t('ploxonDescription.tdd.div4')}</div>
                <div>{t('ploxonDescription.tdd.div5')}</div>
                <div>{t('ploxonDescription.tdd.div6')}</div>
                <div>{t('ploxonDescription.tdd.div7')}</div>
                <div>{t('ploxonDescription.tdd.div8')}</div>
                <div>{t('ploxonDescription.tdd.div9')}</div>
                <div><img className={Styles.mediumImage} src={tddCodeExample} alt="tddCodeExample image"/></div>
                <div>{t('ploxonDescription.tdd.div10')}</div>
                <h2>{t('ploxonDescription.cleanArchitecture.title')}</h2>
                <div>{t('ploxonDescription.cleanArchitecture.div1')}</div>
                <div><img className={Styles.mediumImage} src={cleanArchitecture} alt="cleanArchitecture image"/></div>
                <div>{t('ploxonDescription.cleanArchitecture.div2')}</div>
                <div><img className={Styles.smallImage} src={folderStructure} alt="folderStructure image"/></div>
                <div><img className={Styles.mediumImage} src={layersDependency} alt="layersDependency image"/></div>
                <div>{t('ploxonDescription.cleanArchitecture.div3')}</div>
                <div><img className={Styles.mediumImage} src={cleanJoin} alt="cleanJoin image"/></div>
                <div>{t('ploxonDescription.cleanArchitecture.div4')}</div>
                <div><img className={Styles.mediumImage} src={interfaceAdapter} alt="interfaceAdapter image"/></div>
            </article>
            <h1>{t('ploxonDescription.dao.title')}</h1>
            <article>
                <div>{t('ploxonDescription.dao.div1')}</div>
                <div><Trans i18nKey="ploxonDescription.dao.div2" components={{ LINK_GITHUP: <LinkText to={LINK_GITHUP} title="Github" /> }}/></div>
            </article>
            <h1>{t('ploxonDescription.desclaimer.title')}</h1>
            <article>
                <div>{t('ploxonDescription.desclaimer.div1')}</div>
                <div>{t('ploxonDescription.desclaimer.div2')}</div>
            </article>
        </section>
    </div>
  )
}

export default PloxonHomeMainContent
