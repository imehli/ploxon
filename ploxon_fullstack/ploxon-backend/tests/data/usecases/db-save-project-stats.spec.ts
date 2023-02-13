import { DbSaveProjectStats } from '@/data/usecases'
import { SaveProjectStatsRepositorySpy, LoadProjectStatsRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockSaveProjectStatsParams } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbSaveProjectStats
  saveProjectStatsRepositorySpy: SaveProjectStatsRepositorySpy
  loadProjectStatsRepositorySpy: LoadProjectStatsRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveProjectStatsRepositorySpy = new SaveProjectStatsRepositorySpy()
  const loadProjectStatsRepositorySpy = new LoadProjectStatsRepositorySpy()
  const sut = new DbSaveProjectStats(saveProjectStatsRepositorySpy, loadProjectStatsRepositorySpy)
  return {
    sut,
    saveProjectStatsRepositorySpy,
    loadProjectStatsRepositorySpy
  }
}

describe('DbSaveProjectStats Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveProjectStatsRepository with correct values', async () => {
    const { sut, saveProjectStatsRepositorySpy } = makeSut()
    const projectStatsData = mockSaveProjectStatsParams()
    await sut.save(projectStatsData)
    expect(saveProjectStatsRepositorySpy.params).toEqual(projectStatsData)
  })

  test('Should throw if SaveProjectStatsRepository throws', async () => {
    const { sut, saveProjectStatsRepositorySpy } = makeSut()
    jest.spyOn(saveProjectStatsRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSaveProjectStatsParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadProjectStatsRepository with correct values', async () => {
    const { sut, loadProjectStatsRepositorySpy } = makeSut()
    const projectStatsData = mockSaveProjectStatsParams()
    await sut.save(projectStatsData)
    expect(loadProjectStatsRepositorySpy.projectId).toBe(projectStatsData.projectId)
  })

  test('Should throw if LoadProjectStatsRepository throws', async () => {
    const { sut, loadProjectStatsRepositorySpy } = makeSut()
    jest.spyOn(loadProjectStatsRepositorySpy, 'loadByProjectId').mockImplementationOnce(throwError)
    const promise = sut.save(mockSaveProjectStatsParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return ProjectStats on success', async () => {
    const { sut, loadProjectStatsRepositorySpy } = makeSut()
    const projectStats = await sut.save(mockSaveProjectStatsParams())
    expect(projectStats).toEqual(loadProjectStatsRepositorySpy.result)
  })
})
