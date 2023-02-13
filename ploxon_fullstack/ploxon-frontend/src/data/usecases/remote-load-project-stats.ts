import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadProjectStats } from '@/domain/usecases'

export class RemoteLoadProjectStats implements LoadProjectStats {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadProjectStats.Model>
  ) {}

  async load (): Promise<LoadProjectStats.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const remoteProjectStats = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteProjectStats
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadProjectStats {
  export type Model = LoadProjectStats.Model
}
