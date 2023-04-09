import { LoadAccountInformations } from '@/domain/usecases'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadAccountInformationsController implements Controller {
  constructor (private readonly loadAccountInformations: LoadAccountInformations) {}

  async handle (request: LoadAccountInformationsController.Request): Promise<HttpResponse> {
    try {
      const accountInformations = await this.loadAccountInformations.load(request.accountId)
      return accountInformations !== null ? ok(accountInformations) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadAccountInformationsController {
  export type Request = {
    accountId: string
  }
}
