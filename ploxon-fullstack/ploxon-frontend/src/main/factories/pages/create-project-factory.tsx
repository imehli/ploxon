import { makeCreateProjectValidation } from '@/main/factories/validation'
import { makeRemoteAddProject } from '@/main/factories/usecases'
import { CreateProject } from '@/presentation/pages'

import React from 'react'

export const makeCreateProject: React.FC = () => {
  return (
    <CreateProject
      addProject={makeRemoteAddProject()}
      validation={makeCreateProjectValidation()}
    />
  )
}
