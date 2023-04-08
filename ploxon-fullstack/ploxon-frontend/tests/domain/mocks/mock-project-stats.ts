import { LoadProjectStats, SaveProjectStats } from '@/domain/usecases'

import faker from 'faker'

export const mockSaveProjectStatsParams = (): SaveProjectStats.Params => ({
  description: faker.random.words(),
  resources: faker.random.words()
})

export const mockProjectStatsQueryModel = (): LoadProjectStats.Model => ({
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

export class LoadProjectStatsSpy implements LoadProjectStats {
  callsCount = 0
  projectStats = mockProjectStatsQueryModel()

  async load (): Promise<LoadProjectStats.Model> {
    this.callsCount++
    return this.projectStats
  }
}

export class SaveProjectStatsSpy implements SaveProjectStats {
  callsCount = 0
  params: SaveProjectStats.Params
  projectStats = mockProjectStatsQueryModel()

  async save (params: SaveProjectStats.Params): Promise<SaveProjectStats.Model> {
    this.callsCount++
    this.params = params
    return this.projectStats
  }
}
