import { DbLoadProjectStats } from '@/data/usecases'
import { LoadProjectStatsRepositorySpy, LoadProjectByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadProjectStats
  loadProjectStatsRepositorySpy: LoadProjectStatsRepositorySpy
  loadProjectByIdRepositorySpy: LoadProjectByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadProjectStatsRepositorySpy = new LoadProjectStatsRepositorySpy()
  const loadProjectByIdRepositorySpy = new LoadProjectByIdRepositorySpy()
  const sut = new DbLoadProjectStats(loadProjectStatsRepositorySpy, loadProjectByIdRepositorySpy)
  return {
    sut,
    loadProjectStatsRepositorySpy,
    loadProjectByIdRepositorySpy
  }
}

let projectId: string
let accountId: string

describe('DbLoadProjectStats UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    projectId = faker.datatype.uuid()
    accountId = faker.datatype.uuid()
  })

  test('Should call LoadProjectStatsRepository with correct values', async () => {
    const { sut, loadProjectStatsRepositorySpy } = makeSut()
    await sut.load(projectId, accountId)
    expect(loadProjectStatsRepositorySpy.projectId).toBe(projectId)
    expect(loadProjectStatsRepositorySpy.accountId).toBe(accountId)
  })

  test('Should throw if LoadProjectStatsRepository throws', async () => {
    const { sut, loadProjectStatsRepositorySpy } = makeSut()
    jest.spyOn(loadProjectStatsRepositorySpy, 'loadByProjectId').mockImplementationOnce(throwError)
    const promise = sut.load(projectId, accountId)
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadProjectByIdRepository if LoadProjectStatsRepository returns null', async () => {
    const { sut, loadProjectStatsRepositorySpy, loadProjectByIdRepositorySpy } = makeSut()
    loadProjectStatsRepositorySpy.result = null
    await sut.load(projectId, accountId)
    expect(loadProjectByIdRepositorySpy.id).toBe(projectId)
  })

  test('Should return projectStatsModel with all resourcess with count 0 if LoadProjectStatsRepository returns null', async () => {
    const { sut, loadProjectStatsRepositorySpy, loadProjectByIdRepositorySpy } = makeSut()
    loadProjectStatsRepositorySpy.result = null
    const projectStats = await sut.load(projectId, accountId)
    const { result } = loadProjectByIdRepositorySpy
    expect(projectStats).toEqual({
      accountId: result.accountId,
      projectId: result.projectId,
      description: result.description,
      resources: result.resources,
      projectPrivateStatus: result.projectPrivateStatus,
      stats: {
        status: 'real',
        balance: 0,
        rate: 0,
        date: new Date()
      }
    })
  })

  test('Should return projectStatsModel on success', async () => {
    const { sut, loadProjectStatsRepositorySpy } = makeSut()
    const projectStats = await sut.load(projectId, accountId)
    expect(projectStats).toEqual(loadProjectStatsRepositorySpy.result)
  })
})
