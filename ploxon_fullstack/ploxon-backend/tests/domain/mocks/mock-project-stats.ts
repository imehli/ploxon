import { ProjectStatsQueryModel } from '@/domain/models'
import { SaveProjectStats } from '@/domain/usecases'

import faker from 'faker'

export const mockSaveProjectStatsParams = (): SaveProjectStats.Params => ({
  projectId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  description: faker.random.words(),
  resources: faker.random.words(),
  date: faker.date.recent()
})

export const mockProjectStatsQueryModel = (): ProjectStatsQueryModel => ({
  accountId: faker.datatype.uuid(),
  projectId: faker.datatype.uuid(),
  description: faker.random.words(),
  resources: faker.random.words(),
  projectPrivateStatus: faker.random.words(),
  stats: {
    status: faker.random.word(),
    balance: faker.datatype.number({ min: 0, max: 10000 }),
    rate: faker.datatype.number({ min: 0, max: 1000 }),
    date: faker.date.recent()
  }
})

export const mockEmptyProjectStatsQueryModel = (): ProjectStatsQueryModel => ({
  accountId: faker.datatype.uuid(),
  projectId: faker.datatype.uuid(),
  description: faker.random.words(),
  resources: faker.random.words(),
  projectPrivateStatus: faker.random.words(),
  stats: {
    status: faker.random.word(),
    balance: faker.datatype.number({ min: 0, max: 10000 }),
    rate: faker.datatype.number({ min: 0, max: 1000 }),
    date: faker.date.recent()
  }
})
