import { LoadProjectStats } from '@/domain/usecases'
import { DbLoadProjectStats } from '@/data/usecases'
import { ProjectStatsMongoRepository, ProjectMongoRepository } from '@/infra/db'

export const makeDbLoadProjectStats = (): LoadProjectStats => {
  const projectStatsMongoRepository = new ProjectStatsMongoRepository()
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbLoadProjectStats(projectStatsMongoRepository, projectMongoRepository)
}
