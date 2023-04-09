import { SaveProjectStats, LoadProjectStats } from '@/domain/usecases'
import { mockProjectStatsQueryModel } from '@/tests/domain/mocks'

export class SaveProjectStatsSpy implements SaveProjectStats {
  params: SaveProjectStats.Params
  result = mockProjectStatsQueryModel()

  async save (params: SaveProjectStats.Params): Promise<SaveProjectStats.Result> {
    this.params = params
    return this.result
  }
}

export class LoadProjectStatsSpy implements LoadProjectStats {
  projectId: string
  accountId: string
  result = mockProjectStatsQueryModel()

  async load (projectId: string, accountId: string): Promise<LoadProjectStats.Result> {
    this.projectId = projectId
    this.accountId = accountId
    return this.result
  }
}
