import { RemoteLoadProjectList } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { HttpClientSpy, mockRemoteProjectListModel } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadProjectList
  httpClientSpy: HttpClientSpy<RemoteLoadProjectList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadProjectList.Model[]>()
  const sut = new RemoteLoadProjectList(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadProjectList', () => {
  test('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    await sut.loadAll()

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a list of ProjectModels if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteProjectListModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const projectList = await sut.loadAll()

    expect(projectList).toEqual([{
      projectId: httpResult[0].projectId,
      projectPublicKey: httpResult[0].projectPublicKey,
      projectName: httpResult[0].projectName,
      description: httpResult[0].description,
      resources: httpResult[0].resources,
      projectPrivateStatus: httpResult[0].projectPrivateStatus,
      createdAt: new Date(httpResult[0].createdAt),
      stats: httpResult[0].stats
    }, {
      projectId: httpResult[1].projectId,
      projectPublicKey: httpResult[1].projectPublicKey,
      projectName: httpResult[1].projectName,
      description: httpResult[1].description,
      resources: httpResult[1].resources,
      projectPrivateStatus: httpResult[1].projectPrivateStatus,
      createdAt: new Date(httpResult[1].createdAt),
      stats: httpResult[1].stats
    }, {
      projectId: httpResult[2].projectId,
      projectPublicKey: httpResult[2].projectPublicKey,
      projectName: httpResult[2].projectName,
      description: httpResult[2].description,
      resources: httpResult[2].resources,
      projectPrivateStatus: httpResult[2].projectPrivateStatus,
      createdAt: new Date(httpResult[2].createdAt),
      stats: httpResult[2].stats
    }])
  })

  test('Should return an empty list if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }

    const projectList = await sut.loadAll()

    expect(projectList).toEqual([])
  })
})
