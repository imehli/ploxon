import { ProjectMongoRepository } from '@/infra/db'
import { CheckProjectById } from '@/domain/usecases'
import { DbCheckProjectById } from '@/data/usecases'

export const makeDbCheckProjectById = (): CheckProjectById => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbCheckProjectById(projectMongoRepository)
}
