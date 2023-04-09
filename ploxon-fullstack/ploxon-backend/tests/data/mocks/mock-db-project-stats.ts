import { SaveProjectStatsRepository, LoadProjectStatsRepository } from '@/data/protocols'
import { mockProjectStatsQueryModel } from '@/tests/domain/mocks'

export class SaveProjectStatsRepositorySpy implements SaveProjectStatsRepository {
  params: SaveProjectStatsRepository.Params

  async save (params: SaveProjectStatsRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadProjectStatsRepositorySpy implements LoadProjectStatsRepository {
  projectId: string
  accountId: string
  result = mockProjectStatsQueryModel()

  async loadByProjectId (projectId: string, accountId: string): Promise<LoadProjectStatsRepository.StatsQuery> {
    this.projectId = projectId
    this.accountId = accountId
    return this.result
  }
}
