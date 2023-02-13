import { RemoteLoadProjectStats } from '@/data/usecases'

import faker from 'faker'

export const mockRemoteProjectStatsModel = (): RemoteLoadProjectStats.Model => ({
  accountId: faker.datatype.uuid(),
  projectId: faker.datatype.uuid(),
  projectName: faker.random.words(),
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
