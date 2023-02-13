import Styles from './stats-styles.scss'
// import { ProjectStatsAnswer } from '@/presentation/pages/project-stats/components'
import { LoadProjectStats } from '@/domain/usecases'

import { useHistory } from 'react-router-dom'
import React from 'react'

type Props = {
  projectStats: LoadProjectStats.Model
}

const ProjectStatsData: React.FC<Props> = ({ projectStats }: Props) => {
  const { goBack } = useHistory()
  return (
    <div>
      <hgroup>
        <h2>{projectStats.projectName}</h2>
        <div className={Styles.informations}>
          <div className={Styles.bloc}>
            <p className={Styles.titles}>Description</p>
            <p data-testid="description">{projectStats.description}</p>
          </div>
          <div className={Styles.bloc}>
            <p className={Styles.titles}>Resources</p>
            <p data-testid="resources">{projectStats.resources}</p>
          </div>
          <div className={Styles.bloc}>
            <p className={Styles.titles}>Status</p>
            <p data-testid="status">{projectStats.stats.status}</p>
          </div>
          <div className={Styles.bloc}>
            <p className={Styles.titles}>Balance</p>
            <p data-testid="balance">{projectStats.stats.balance}</p>
          </div>
          <div className={Styles.bloc}>
            <p className={Styles.titles}>Rate</p>
            <p data-testid="rate">{projectStats.stats.rate}</p>
          </div>
        </div>
      </hgroup>
      <button className={Styles.button} data-testid="back-button" onClick={goBack}>Go back</button>
    </div>
  )
}

export default ProjectStatsData
