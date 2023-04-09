import { LoadProjectStatsController } from '@/presentation/controllers'
import { forbidden, serverError, ok } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { CheckProjectByIdSpy, LoadProjectStatsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): LoadProjectStatsController.Request => ({
  accountId: faker.datatype.uuid(),
  projectId: faker.datatype.uuid()
})

type SutTypes = {
  sut: LoadProjectStatsController
  checkProjectByIdSpy: CheckProjectByIdSpy
  loadProjectStatsSpy: LoadProjectStatsSpy
}

const makeSut = (): SutTypes => {
  const checkProjectByIdSpy = new CheckProjectByIdSpy()
  const loadProjectStatsSpy = new LoadProjectStatsSpy()
  const sut = new LoadProjectStatsController(checkProjectByIdSpy, loadProjectStatsSpy)
  return {
    sut,
    checkProjectByIdSpy,
    loadProjectStatsSpy
  }
}

describe('LoadProjectStats Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call CheckProjectById with correct value', async () => {
    const { sut, checkProjectByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkProjectByIdSpy.projectId).toBe(request.projectId)
  })

  test('Should return 403 if CheckProjectById returns false', async () => {
    const { sut, checkProjectByIdSpy } = makeSut()
    checkProjectByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('projectId')))
  })

  test('Should return 500 if CheckProjectById throws', async () => {
    const { sut, checkProjectByIdSpy } = makeSut()
    jest.spyOn(checkProjectByIdSpy, 'checkById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadProjectStats with correct values', async () => {
    const { sut, loadProjectStatsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadProjectStatsSpy.projectId).toBe(request.projectId)
    expect(loadProjectStatsSpy.accountId).toBe(request.accountId)
  })

  test('Should return 500 if LoadProjectStats throws', async () => {
    const { sut, loadProjectStatsSpy } = makeSut()
    jest.spyOn(loadProjectStatsSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadProjectStatsSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadProjectStatsSpy.result))
  })
})
