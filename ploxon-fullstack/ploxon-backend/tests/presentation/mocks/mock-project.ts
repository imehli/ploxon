import { AddProject, LoadStateByProject, LoadProjects, CheckProjectById } from '@/domain/usecases'
import { mockProjectModels } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddProjectSpy implements AddProject {
  params: AddProject.Params

  async add (params: AddProject.Params): Promise<void> {
    this.params = params
  }
}

export class LoadProjectsSpy implements LoadProjects {
  accountId: string
  result = mockProjectModels()

  async load (accountId: string): Promise<LoadProjects.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class LoadStateByProjectSpy implements LoadStateByProject {
  projectId: string
  result = {
    projectPrivateStatus: faker.datatype.boolean(),
    status: faker.random.word(),
    balance: faker.datatype.number({ min: 0, max: 10000 }),
    rate: faker.datatype.number({ min: 0, max: 1000 }),
    date: faker.date.recent()
  }

  async loadState (projectId: string): Promise<LoadStateByProject.Result> {
    this.projectId = projectId
    return this.result
  }
}

export class CheckProjectByIdSpy implements CheckProjectById {
  projectId: string
  result = true

  async checkById (projectId: string): Promise<CheckProjectById.Result> {
    this.projectId = projectId
    return this.result
  }
}
