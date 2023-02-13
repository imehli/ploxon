import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { LoadAccountInformations } from '@/domain/usecases'
import { RemoteAccountInformationsModel } from '@/data/models'

export class RemoteLoadAccountInformations implements LoadAccountInformations {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadAccountInformations.Model>
  ) {}

  async loadAll (): Promise<LoadAccountInformations.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post'
    })
    const remoteAccountInformations = httpResponse.body || null
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteAccountInformations
      case HttpStatusCode.noContent: return null
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadAccountInformations {
  export type Model = RemoteAccountInformationsModel
}
