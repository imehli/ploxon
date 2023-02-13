import { ProjectMongoRepository } from '@/infra/db'
import { LoadProjects } from '@/domain/usecases'
import { DbLoadProjects } from '@/data/usecases'

export const makeDbLoadProjects = (): LoadProjects => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbLoadProjects(projectMongoRepository)
}
