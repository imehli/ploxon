import { AddProject } from '@/domain/usecases'
import { mockProjectStatsQueryModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddProjectParams = (): AddProject.Params => ({
  projectName: faker.commerce.productName(),
  description: faker.random.word(),
  resources: faker.random.word(),
  projectPrivateStatus: faker.random.words()
})

export const mockAddProjectModel = (): AddProject.Model => mockProjectStatsQueryModel()

export class AddProjectSpy implements AddProject {
  project = mockProjectStatsQueryModel()
  params: AddProject.Params
  callsCount = 0

  async add (params: AddProject.Params): Promise<AddProject.Model> {
    this.params = params
    this.callsCount++
    return this.project
  }
}
