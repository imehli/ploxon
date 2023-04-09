import Styles from './project-list-styles.scss'
import { Header, Footer, Error } from '@/presentation/components'
import { ProjectListItem, projectListState } from '@/presentation/pages/project-list/components'
import { useErrorHandler } from '@/presentation/hooks'
import { LoadProjectList } from '@/domain/usecases'

import { useRecoilState, useResetRecoilState } from 'recoil'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  loadProjectList: LoadProjectList
}

const ProjectList: React.FC<Props> = ({ loadProjectList }: Props) => {
  const resetProjectListState = useResetRecoilState(projectListState)
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })
  const [state, setState] = useRecoilState(projectListState)
  const reload = (): void => setState(old => ({ projects: [], error: '', reload: !old.reload }))
  const { t } = useTranslation()

  useEffect(() => resetProjectListState(), [])
  useEffect(() => {
    loadProjectList.loadAll()
      .then(projects => setState(old => ({ ...old, projects })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.projectListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>{t('projects.header')}</h2>
        {state.error
          ? <Error error={state.error} reload={reload} />
          : <ProjectListItem projects={state.projects} />
        }
      </div>
      <Footer />
    </div>
  )
}

export default ProjectList
