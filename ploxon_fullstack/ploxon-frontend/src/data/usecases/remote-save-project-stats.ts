import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { SaveProjectStats } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteSaveProjectStats implements SaveProjectStats {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveProjectStats.Model>
  ) {}

  async save (params: SaveProjectStats.Params): Promise<SaveProjectStats.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })
    const remoteProjectStats = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteProjectStats
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveProjectStats {
  export type Model = SaveProjectStats.Model
}
