import { DbCheckProjectById } from '@/data/usecases'
import { CheckProjectByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbCheckProjectById
  checkProjectByIdRepositorySpy: CheckProjectByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkProjectByIdRepositorySpy = new CheckProjectByIdRepositorySpy()
  const sut = new DbCheckProjectById(checkProjectByIdRepositorySpy)
  return {
    sut,
    checkProjectByIdRepositorySpy
  }
}

let projectId: string

describe('DbLoadProjectById', () => {
  beforeEach(() => {
    projectId = faker.datatype.uuid()
  })

  test('Should call CheckProjectByIdRepository', async () => {
    const { sut, checkProjectByIdRepositorySpy } = makeSut()
    await sut.checkById(projectId)
    expect(checkProjectByIdRepositorySpy.id).toBe(projectId)
  })

  test('Should return true if CheckProjectByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById(projectId)
    expect(exists).toBe(true)
  })

  test('Should return false if CheckProjectByIdRepository returns false', async () => {
    const { sut, checkProjectByIdRepositorySpy } = makeSut()
    checkProjectByIdRepositorySpy.result = false
    const exists = await sut.checkById(projectId)
    expect(exists).toBe(false)
  })

  test('Should throw if CheckProjectByIdRepository throws', async () => {
    const { sut, checkProjectByIdRepositorySpy } = makeSut()
    jest.spyOn(checkProjectByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById(projectId)
    await expect(promise).rejects.toThrow()
  })
})
