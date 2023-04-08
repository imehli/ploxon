import Styles from './project-stats-styles.scss'
import { Header, Footer, Loading, Error } from '@/presentation/components'
import { projectStatsState, onProjectAnswerState, ProjectStatsData } from '@/presentation/pages/project-stats/components'
import { useErrorHandler } from '@/presentation/hooks'
import { LoadProjectStats, SaveProjectStats } from '@/domain/usecases'

import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'
import React, { useEffect } from 'react'

type Props = {
  loadProjectStats: LoadProjectStats
  saveProjectStats: SaveProjectStats
}

const ProjectStats: React.FC<Props> = ({ loadProjectStats, saveProjectStats }: Props) => {
  const resetProjectStatsState = useResetRecoilState(projectStatsState)
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, projectStats: null, isLoading: false, error: error.message }))
  })
  const [state, setState] = useRecoilState(projectStatsState)
  const setOnAnswer = useSetRecoilState(onProjectAnswerState)
  const onAnswer = ({ description, resources }): void => {
    if (!state.isLoading) {
      setState(old => ({ ...old, isLoading: true }))
      saveProjectStats.save({ description, resources })
        .then(projectStats => setState(old => ({ ...old, isLoading: false, projectStats })))
        .catch(handleError)
    }
  }
  const reload = (): void => setState(old => ({ ...old, error: '', reload: !old.reload }))

  useEffect(() => {
    resetProjectStatsState()
    setOnAnswer({ onAnswer })
  }, [])

  useEffect(() => {
    loadProjectStats.load()
      .then(projectStats => setState(old => ({ ...old, projectStats })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.projectStatsWrap}>
      <Header />
      <div data-testid="project-stats" className={Styles.contentWrap}>

        {state.projectStats && <ProjectStatsData projectStats={state.projectStats} /> }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default ProjectStats
