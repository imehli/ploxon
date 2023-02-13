import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { LoadProjectList } from '@/domain/usecases'

export class RemoteLoadProjectList implements LoadProjectList {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadProjectList.Model[]>
  ) {}

  async loadAll (): Promise<LoadProjectList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const remoteProjects = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteProjects.map(remoteProject => ({
        ...remoteProject,
        createdAt: new Date(remoteProject.createdAt)
      }))
      case HttpStatusCode.noContent: return []
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadProjectList {
  export type Model = LoadProjectList.Model
}
