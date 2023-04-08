import Styles from './list-styles.scss'
import { LoadProjectList } from '@/domain/usecases'
import { ProjectItem, ProjectItemEmpty } from '@/presentation/pages/project-list/components'

import React from 'react'

type Props = {
  projects: LoadProjectList.Model[]
}

const List: React.FC<Props> = ({ projects }: Props) => {
  return (
    <ul className={Styles.listWrap} data-testid="project-list">
      {projects.length
        ? projects.map((project: LoadProjectList.Model) => <ProjectItem key={project.projectId} project={project} />)
        : <ProjectItemEmpty />
      }
    </ul>
  )
}

export default List
