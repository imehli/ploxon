import { ProjectMongoRepository } from '@/infra/db'
import { LoadStateByProject } from '@/domain/usecases'
import { DbLoadStateByProject } from '@/data/usecases'

export const makeDbLoadStateByProject = (): LoadStateByProject => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbLoadStateByProject(projectMongoRepository)
}
