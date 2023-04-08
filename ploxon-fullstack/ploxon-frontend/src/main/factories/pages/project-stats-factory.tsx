import { makeRemoteLoadProjectStats, makeRemoteSaveProjectStats } from '@/main/factories/usecases'
import { ProjectStats } from '@/presentation/pages'
import { useParams } from 'react-router-dom'

import React from 'react'

export const makeProjectStats: React.FC = () => {
  type Props = {
    projectId: string
  }
  const { projectId } = useParams<Props>()
  return (
    <ProjectStats
      loadProjectStats={makeRemoteLoadProjectStats(projectId)}
      saveProjectStats={makeRemoteSaveProjectStats(projectId)}
    />
  )
}
