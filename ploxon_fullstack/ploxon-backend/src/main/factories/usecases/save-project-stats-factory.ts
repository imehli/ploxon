import { SaveProjectStats } from '@/domain/usecases'
import { DbSaveProjectStats } from '@/data/usecases'
import { ProjectStatsMongoRepository } from '@/infra/db'

export const makeDbSaveProjectStats = (): SaveProjectStats => {
  const projectStatsMongoRepository = new ProjectStatsMongoRepository()
  return new DbSaveProjectStats(projectStatsMongoRepository, projectStatsMongoRepository)
}
