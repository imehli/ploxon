import { RemoteLoadProjectStats } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClientSpy, mockRemoteProjectStatsModel } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadProjectStats
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadProjectStats(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadProjectStats', () => {
  test('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteProjectStatsModel()
    }

    await sut.load()

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.load()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.load()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.load()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a ProjectStats on 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpStats = mockRemoteProjectStatsModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpStats
    }

    const httpResponse = await sut.load()

    expect(httpResponse).toEqual({
      accountId: httpStats.accountId,
      projectId: httpStats.projectId,
      description: httpStats.description,
      resources: httpStats.resources,
      projectPrivateStatus: httpStats.projectPrivateStatus,
      stats: httpStats.stats
    })
  })
})
