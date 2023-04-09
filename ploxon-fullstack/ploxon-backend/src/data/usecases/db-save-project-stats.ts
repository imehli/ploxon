import { SaveProjectStats } from '@/domain/usecases'
import { SaveProjectStatsRepository, LoadProjectStatsRepository } from '@/data/protocols'

export class DbSaveProjectStats implements SaveProjectStats {
  constructor (
    private readonly saveProjectStatsRepository: SaveProjectStatsRepository,
    private readonly loadProjectStatsRepository: LoadProjectStatsRepository
  ) {}

  async save (data: SaveProjectStats.Params): Promise<SaveProjectStats.Result> {
    await this.saveProjectStatsRepository.save(data)
    return this.loadProjectStatsRepository.loadByProjectId(data.projectId, data.accountId)
  }
}
