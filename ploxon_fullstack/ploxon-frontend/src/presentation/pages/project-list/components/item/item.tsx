import Styles from './item-styles.scss'
import { LoadProjectList } from '@/domain/usecases'

import { Link } from 'react-router-dom'
import React from 'react'

type Props = {
  project: LoadProjectList.Model
}

const ProjectItem: React.FC<Props> = ({ project }: Props) => {
  return (
    <li className={Styles.projectItemWrap}>
      <div className={Styles.projectContent}>
        <div className={Styles.name}>
          <p className={Styles.titles}>Name</p>
          <p data-testid="projectName">{project.projectName}</p>
        </div>
        <div className={Styles.publicKey}>
          <p className={Styles.titles}>Public key</p>
          <p data-testid="projectPublicKey">{project.projectPublicKey}</p>
        </div>
        <div className={Styles.status}>
          <p className={Styles.titles}>Status</p>
          <p data-testid="projectPrivateStatus">{project.projectPrivateStatus}</p>
        </div>
      </div>
      <footer><Link data-testid="link" to={`/projects/${project.projectId}`}>See more informations</Link></footer>
    </li>
  )
}

export default ProjectItem
