import { LoadAccountInformationsController } from '@/presentation/controllers'
import { LoadAccountInformationsSpy } from '@/tests/presentation/mocks'
import { ok, serverError, noContent } from '@/presentation/helpers'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): LoadAccountInformationsController.Request => ({ accountId: faker.datatype.uuid() })

type SutTypes = {
  sut: LoadAccountInformationsController
  loadAccountInformationsSpy: LoadAccountInformationsSpy
}

const makeSut = (): SutTypes => {
  const loadAccountInformationsSpy = new LoadAccountInformationsSpy()
  const sut = new LoadAccountInformationsController(loadAccountInformationsSpy)
  return {
    sut,
    loadAccountInformationsSpy
  }
}

describe('LoadAccountInformationsController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadAccountInformations with correct values', async () => {
    const { sut, loadAccountInformationsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountInformationsSpy.accountId).toBe(request.accountId)
  })

  test('Should return 200 on succes', async () => {
    const { sut, loadAccountInformationsSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(loadAccountInformationsSpy.result))
  })

  test('Should return 204 if LoadAccountInformations return empty', async () => {
    const { sut, loadAccountInformationsSpy } = makeSut()
    const request = mockRequest()
    loadAccountInformationsSpy.result = null
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadAccountInformations throws', async () => {
    const { sut, loadAccountInformationsSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(loadAccountInformationsSpy, 'load').mockRejectedValueOnce('error')
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
