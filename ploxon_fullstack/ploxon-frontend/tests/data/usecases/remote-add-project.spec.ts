import { RemoteAddProject } from '@/data/usecases'
import { mockAddProjectModel, mockAddProjectParams } from '@/tests/domain/mocks'
import { HttpClientSpy } from '@/tests/data/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { NameExistError, UnexpectedError } from '@/domain/errors'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAddProject
  httpClientSpy: HttpClientSpy<RemoteAddProject.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddProject.Model>()
  const sut = new RemoteAddProject(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddProject', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const addProjectParams = mockAddProjectParams()

    await sut.add(addProjectParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(addProjectParams)
  })

  test('Should throw NameExistError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.add(mockAddProjectParams())

    await expect(promise).rejects.toThrow(new NameExistError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.add(mockAddProjectParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.add(mockAddProjectParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.add(mockAddProjectParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AddProject.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockAddProjectModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.add(mockAddProjectParams())

    expect(account).toEqual(httpResult)
  })
  test('Should return an AddProject.Model if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }

    const promise = await sut.add(mockAddProjectParams())

    expect(promise).toBe(null)
  })
})
