import { RemoteLoadProjectList } from '@/data/usecases'
import { LoadProjectList } from '@/domain/usecases'

import faker from 'faker'

export const mockRemoteProjectModel = (): RemoteLoadProjectList.Model => ({
  projectId: faker.datatype.uuid(),
  projectName: faker.commerce.productName(),
  projectPublicKey: faker.datatype.uuid(),
  description: faker.random.words(),
  resources: faker.random.words(),
  projectPrivateStatus: faker.random.words(),
  createdAt: faker.date.recent(),
  stats: mockProjectStatsModel()
})

export const mockProjectStatsModel = (): LoadProjectList.ProjectStatsModel => {
  return {
    status: faker.random.word(),
    balance: faker.datatype.number({ min: 0, max: 10000 }),
    rate: faker.datatype.number({ min: 0, max: 1000 }),
    date: faker.date.recent()
  }
}

export const mockRemoteProjectListModel = (): RemoteLoadProjectList.Model[] => ([
  mockRemoteProjectModel(),
  mockRemoteProjectModel(),
  mockRemoteProjectModel()
])
