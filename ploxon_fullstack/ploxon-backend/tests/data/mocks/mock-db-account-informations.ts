import { LoadAccountInformationsRepository } from '@/data/protocols'
import { mockAccountInformations } from '@/tests/domain/mocks'

export class LoadAccountInformationsRepositorySpy implements LoadAccountInformationsRepository {
  accountId: string
  result = mockAccountInformations()

  async loadInformations (accountId: string): Promise<LoadAccountInformationsRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}
