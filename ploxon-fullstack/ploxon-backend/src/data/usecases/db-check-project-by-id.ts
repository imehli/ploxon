import { CheckProjectById } from '@/domain/usecases'
import { CheckProjectByIdRepository } from '@/data/protocols'

export class DbCheckProjectById implements CheckProjectById {
  constructor (private readonly checkProjectByIdRepository: CheckProjectByIdRepository) {}

  async checkById (projectId: string): Promise<CheckProjectById.Result> {
    return this.checkProjectByIdRepository.checkById(projectId)
  }
}
