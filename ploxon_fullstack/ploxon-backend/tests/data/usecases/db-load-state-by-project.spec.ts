import { DbLoadStateByProject } from '@/data/usecases'
import { LoadStateByProjectRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadStateByProject
  loadStateByProjectRepositorySpy: LoadStateByProjectRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadStateByProjectRepositorySpy = new LoadStateByProjectRepositorySpy()
  const sut = new DbLoadStateByProject(loadStateByProjectRepositorySpy)
  return {
    sut,
    loadStateByProjectRepositorySpy
  }
}

let projectId: string

describe('DbLoadStateByProject', () => {
  beforeEach(() => {
    projectId = faker.datatype.uuid()
  })

  test('Should call LoadStateByProjectRepository', async () => {
    const { sut, loadStateByProjectRepositorySpy } = makeSut()
    await sut.loadState(projectId)
    expect(loadStateByProjectRepositorySpy.id).toBe(projectId)
  })

  test('Should return state on success', async () => {
    const { sut, loadStateByProjectRepositorySpy } = makeSut()
    const state = await sut.loadState(projectId)
    expect(state).toEqual(loadStateByProjectRepositorySpy.result)
  })

  test('Should return empty array if LoadStateByProjectRepository returns null', async () => {
    const { sut, loadStateByProjectRepositorySpy } = makeSut()
    loadStateByProjectRepositorySpy.result = null
    const state = await sut.loadState(projectId)
    expect(state).toEqual(null)
  })

  test('Should throw if LoadStateByProjectRepository throws', async () => {
    const { sut, loadStateByProjectRepositorySpy } = makeSut()
    jest.spyOn(loadStateByProjectRepositorySpy, 'loadState').mockImplementationOnce(throwError)
    const promise = sut.loadState(projectId)
    await expect(promise).rejects.toThrow()
  })
})
