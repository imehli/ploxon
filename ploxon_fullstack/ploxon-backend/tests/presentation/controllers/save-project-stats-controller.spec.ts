import { SaveProjectStatsController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, ok } from '@/presentation/helpers'
import { SaveProjectStatsSpy, LoadStateByProjectSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): SaveProjectStatsController.Request => ({
  projectId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  description: faker.random.words(),
  resources: faker.random.words()
})

type SutTypes = {
  sut: SaveProjectStatsController
  loadStateByProjectSpy: LoadStateByProjectSpy
  saveProjectStatsSpy: SaveProjectStatsSpy
}

const makeSut = (): SutTypes => {
  const loadStateByProjectSpy = new LoadStateByProjectSpy()
  const saveProjectStatsSpy = new SaveProjectStatsSpy()
  const sut = new SaveProjectStatsController(loadStateByProjectSpy, saveProjectStatsSpy)
  return {
    sut,
    loadStateByProjectSpy,
    saveProjectStatsSpy
  }
}

describe('SaveProjectStats Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadStateByProject with correct values', async () => {
    const { sut, loadStateByProjectSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadStateByProjectSpy.projectId).toBe(request.projectId)
  })

  test('Should return 403 if LoadStateByProject returns null', async () => {
    const { sut, loadStateByProjectSpy } = makeSut()
    loadStateByProjectSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('projectId')))
  })

  test('Should return 500 if LoadStateByProject throws', async () => {
    const { sut, loadStateByProjectSpy } = makeSut()
    jest.spyOn(loadStateByProjectSpy, 'loadState').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  // test('Should return 403 if an invalid resources is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpResponse = await sut.handle(mockRequest())
  //   expect(httpResponse).toEqual(forbidden(new InvalidParamError('resources')))
  // })

  test('Should call SaveProjectStats with correct values', async () => {
    const { sut, saveProjectStatsSpy} = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveProjectStatsSpy.params).toEqual({
      projectId: request.projectId,
      accountId: request.accountId,
      description: request.description,
      resources: request.resources,
      date: new Date()
    })
  })

  test('Should return 500 if SaveProjectStats throws', async () => {
    const { sut, saveProjectStatsSpy } = makeSut()
    jest.spyOn(saveProjectStatsSpy, 'save').mockImplementationOnce(throwError)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, saveProjectStatsSpy} = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(saveProjectStatsSpy.result))
  })
})
