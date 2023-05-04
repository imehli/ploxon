import Styles from './ploxon-home-main-content-styles.scss'
import tddPrincipal from './img/tdd-principal.jpg'
import gps from './img/gps.jpg'
import tddCodeExample from './img/tdd-code-example.png'
import cleanArchitecture from './img/ploxon-architecture.png'
import folderStructure from './img/ploxon-folder-structure.png'
import layersDependency from './img/layers-dependency.png'
import cleanJoin from './img/clean-join.png'
import interfaceAdapter from './img/interface-adapter-usecase-pattern.png'
import infrastructureArchitecture from './img/ploxon-infra-architecture.png'

import { currentAccountState , LinkText } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

const PloxonHomeMainContent: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const { t } = useTranslation()
  const LINK_GITHUB = 'https://github.com/imehli/ploxon'
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
                            <div className={Styles.menuOptions}><Link data-testid="login-link" to="/login"><p>{t('ploxonHome.navigation.signin')}</p></Link></div>
                            <div className={Styles.menuOptions}><Link data-testid="signup-link" to="/signup"><p>{t('ploxonHome.navigation.signup')}</p></Link></div>
                        </div>
                    }
                    <div className={Styles.menuOptions}><a href={LINK_GITHUB} target="_blank" rel="noreferrer"><p>Github</p></a></div>
                    <div className={Styles.menuOptions}><a href={LINK_PLOXON_GRAPHQL_API} target="_blank" rel="noreferrer"><p>{t('ploxonHome.navigation.graphql')}</p></a></div>
                </div>
            </div>
        </section>
        <section data-testid="ploxon-home1" className={Styles.youtubeSection}>
            <div data-testid="ploxon-home1" className={Styles.youtubeSectionContent}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/GCMSSrhus9k" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </section>
        <section id="secondSection" data-testid="ploxon-home2" className={Styles.secondSection}>
            <h1>{t('ploxonHome.ploxonDescription.presentation.title')}</h1>
            <div>{t('ploxonHome.ploxonDescription.presentation.div1')}</div>
            <article>
                <h2>{t('ploxonHome.ploxonDescription.tdd.title')}</h2>
                <div>{t('ploxonHome.ploxonDescription.tdd.div1')}</div>
                <div className={Styles.imagesWrap}><img className={Styles.mediumImage} src={gps} alt="gps image"/></div>
                <div>{t('ploxonHome.ploxonDescription.tdd.div2')}</div>
                <div className={Styles.imagesWrap}><img className={Styles.mediumImage} src={tddPrincipal} alt="tddPrincipal image"/></div>
                <div>{t('ploxonHome.ploxonDescription.tdd.div3')}</div>
                <div>{t('ploxonHome.ploxonDescription.tdd.div4')}</div>
                <div>{t('ploxonHome.ploxonDescription.tdd.div5')}</div>
                <div>{t('ploxonHome.ploxonDescription.tdd.div6')}</div>
                <div>{t('ploxonHome.ploxonDescription.tdd.div7')}</div>
                <div>{t('ploxonHome.ploxonDescription.tdd.div8')}</div>
                <div>{t('ploxonHome.ploxonDescription.tdd.div9')}</div>
                <div className={Styles.imagesWrap}><img className={Styles.mediumImage} src={tddCodeExample} alt="tddCodeExample image"/></div>
                <div>{t('ploxonHome.ploxonDescription.tdd.div10')}</div>
                <h2>{t('ploxonHome.ploxonDescription.cleanArchitecture.title')}</h2>
                <div>{t('ploxonHome.ploxonDescription.cleanArchitecture.div1')}</div>
                <div className={Styles.imagesWrap}><img className={Styles.mediumImage} src={cleanArchitecture} alt="cleanArchitecture image"/></div>
                <div>{t('ploxonHome.ploxonDescription.cleanArchitecture.div2')}</div>
                <div className={Styles.imagesWrap}><img className={Styles.smallImage} src={folderStructure} alt="folderStructure image"/></div>
                <div className={Styles.imagesWrap}><img className={Styles.mediumImage} src={layersDependency} alt="layersDependency image"/></div>
                <div>{t('ploxonHome.ploxonDescription.cleanArchitecture.div3')}</div>
                <div className={Styles.imagesWrap}><img className={Styles.mediumImage} src={cleanJoin} alt="cleanJoin image"/></div>
                <div>{t('ploxonHome.ploxonDescription.cleanArchitecture.div4')}</div>
                <div className={Styles.imagesWrap}><img className={Styles.mediumImage} src={interfaceAdapter} alt="interfaceAdapter image"/></div>
                <div>{t('ploxonHome.ploxonDescription.cleanArchitecture.div5')}</div>
                <h2>{t('ploxonHome.ploxonDescription.infrastructure.title')}</h2>
                <div>{t('ploxonHome.ploxonDescription.infrastructure.div1')}</div>
                <div>{t('ploxonHome.ploxonDescription.infrastructure.div2')}</div>
                <div>{t('ploxonHome.ploxonDescription.infrastructure.div3')}</div>
                <div className={Styles.imagesWrap}><img className={Styles.largeImage} src={infrastructureArchitecture} alt="infrastructureArchitecture image"/></div>
                <div>{t('ploxonHome.ploxonDescription.infrastructure.div4')}</div>
            </article>
            <h1>{t('ploxonHome.ploxonDescription.dao.title')}</h1>
            <article>
                <div>{t('ploxonHome.ploxonDescription.dao.div1')}</div>
                <div><Trans i18nKey="ploxonHome.ploxonDescription.dao.div2" components={{ LINK_GITHUB: <LinkText to={LINK_GITHUB} title="Github" /> }}/></div>
            </article>
            <h1>{t('ploxonHome.ploxonDescription.desclaimer.title')}</h1>
            <article>
                <div>{t('ploxonHome.ploxonDescription.desclaimer.div1')}</div>
                <div>{t('ploxonHome.ploxonDescription.desclaimer.div2')}</div>
            </article>
        </section>
    </div>
  )
}

export default PloxonHomeMainContent
