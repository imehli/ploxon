import { AddProject } from '@/domain/usecases'
import { AddProjectRepository } from '@/data/protocols'

export class DbAddProject implements AddProject {
  constructor (private readonly addProjectRepository: AddProjectRepository) {}

  async add (projectData: AddProject.Params): Promise<void> {
    await this.addProjectRepository.add(projectData)
  }
}
