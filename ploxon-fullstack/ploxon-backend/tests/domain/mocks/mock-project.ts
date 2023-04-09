import { ProjectModel, ProjectStatsModel } from '@/domain/models'
import { AddProject } from '@/domain/usecases'

import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockProjectModel = (): ProjectModel => {
  return {
    id: new ObjectId(),
    accountId: faker.datatype.uuid(),
    projectId: faker.datatype.uuid(),
    projectPublicKey: faker.datatype.uuid(),
    projectName: faker.commerce.productName(),
    description: faker.random.words(),
    resources: faker.random.words(),
    projectPrivateStatus: faker.random.words(),
    createdAt: faker.date.recent(),
    stats: mockProjectStatsModel()
  }
}

export const mockProjectModels = (): ProjectModel[] => ([
  mockProjectModel(),
  mockProjectModel()
])

export const mockProjectStatsModel = (): ProjectStatsModel => {
  return {
    status: faker.random.word(),
    balance: faker.datatype.number({ min: 0, max: 10000 }),
    rate: faker.datatype.number({ min: 0, max: 1000 }),
    date: faker.date.recent()
  }
}

export const mockAddProjectParams = (): AddProject.Params => ({
  projectName: faker.commerce.productName(),
  description: faker.random.word(),
  resources: faker.random.word(),
  projectPrivateStatus: faker.random.word(),
  createdAt: faker.date.recent()
})

export const mockAddProjectPrivateParams = (): object => ({
  projectPublicKey: faker.datatype.uuid(),
  stats: {
    status: 'Draft',
    balance: 0,
    rate: 0,
    date: faker.date.recent()
  }
})
