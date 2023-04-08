import { makeRemoteLoadProjectList } from '@/main/factories/usecases'
import { ProjectList } from '@/presentation/pages'

import React from 'react'

export const makeProjectList: React.FC = () => {
  return (
    <ProjectList
      loadProjectList={makeRemoteLoadProjectList()}
    />
  )
}
