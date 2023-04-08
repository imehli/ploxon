import { AddProject } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { NameExistError, UnexpectedError } from '@/domain/errors'

export class RemoteAddProject implements AddProject {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddProject.Model>
  ) {}

  async add (params: AddProject.Params): Promise<AddProject.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return null
      case HttpStatusCode.forbidden: throw new NameExistError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddProject {
  export type Model = AddProject.Model
}
