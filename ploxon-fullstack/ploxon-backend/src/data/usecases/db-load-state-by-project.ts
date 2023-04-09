import { LoadStateByProject } from '@/domain/usecases'
import { LoadStateByProjectRepository } from '@/data/protocols'

export class DbLoadStateByProject implements LoadStateByProject {
  constructor (private readonly loadStateByProjectRepository: LoadStateByProjectRepository) {}

  async loadState (id: string): Promise<LoadStateByProject.Result> {
    return this.loadStateByProjectRepository.loadState(id)
  }
}
