import { AddProjectRepository, LoadProjectByIdRepository, LoadProjectsRepository, CheckProjectByIdRepository, LoadStateByProjectRepository } from '@/data/protocols'
import { mockProjectModel, mockProjectModels } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddProjectRepositorySpy implements AddProjectRepository {
  params: AddProjectRepository.Params

  async add (params: AddProjectRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadProjectByIdRepositorySpy implements LoadProjectByIdRepository {
  id: any
  result = mockProjectModel()

  async loadById (id: any): Promise<LoadProjectByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadStateByProjectRepositorySpy implements LoadStateByProjectRepository {
  id: any
  result = {
    projectPrivateStatus: faker.datatype.boolean(),
    status: faker.random.word(),
    balance: faker.datatype.number({ min: 0, max: 10000 }),
    rate: faker.datatype.number({ min: 0, max: 1000 }),
    date: faker.date.recent()
  }

  async loadState (id: any): Promise<LoadStateByProjectRepository.Result> {
    this.id = id
    return this.result
  }
}

export class CheckProjectByIdRepositorySpy implements CheckProjectByIdRepository {
  id: any
  result = true

  async checkById (id: any): Promise<CheckProjectByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadProjectsRepositorySpy implements LoadProjectsRepository {
  accountId: string
  result = mockProjectModels()

  async loadAll (accountId: string): Promise<LoadProjectsRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}
