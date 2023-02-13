import { DbLoadAccountInformations } from '@/data/usecases'
import { LoadAccountInformationsRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountInformations
  loadAccountInformationsRepositorySpy: LoadAccountInformationsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountInformationsRepositorySpy = new LoadAccountInformationsRepositorySpy()
  const sut = new DbLoadAccountInformations(loadAccountInformationsRepositorySpy)
  return {
    sut,
    loadAccountInformationsRepositorySpy
  }
}

describe('DbLoadAccountInformations UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadAccountInformationsRepository', async () => {
    const { sut, loadAccountInformationsRepositorySpy } = makeSut()
    const accountId = faker.datatype.uuid()
    await sut.load(accountId)
    expect(loadAccountInformationsRepositorySpy.accountId).toBe(accountId)
  })

  test('Should call an object containing account informations', async () => {
    const { sut, loadAccountInformationsRepositorySpy } = makeSut()
    const accountId = faker.datatype.uuid()
    const accountInformations = await sut.load(accountId)
    expect(accountInformations).toEqual(loadAccountInformationsRepositorySpy.result)
  })

  test('Should throw if LoadAccountInformationsRepository throws', async () => {
    const { sut, loadAccountInformationsRepositorySpy } = makeSut()
    const accountId = faker.datatype.uuid()
    jest.spyOn(loadAccountInformationsRepositorySpy, 'loadInformations').mockImplementationOnce(throwError)
    const promise = sut.load(accountId)
    await expect(promise).rejects.toThrow()
  })
})
