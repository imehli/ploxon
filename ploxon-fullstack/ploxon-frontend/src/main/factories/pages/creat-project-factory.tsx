import { makeCreatProjectValidation } from '@/main/factories/validation'
import { makeRemoteAddProject } from '@/main/factories/usecases'
import { CreatProject } from '@/presentation/pages'

import React from 'react'

export const makeCreatProject: React.FC = () => {
  return (
    <CreatProject
      addProject={makeRemoteAddProject()}
      validation={makeCreatProjectValidation()}
    />
  )
}
