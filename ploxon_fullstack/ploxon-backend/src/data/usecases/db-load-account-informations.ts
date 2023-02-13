import { LoadAccountInformationsRepository } from '@/data/protocols'

import { LoadAccountInformations } from '@/domain/usecases'

export class DbLoadAccountInformations implements LoadAccountInformations {
  constructor (private readonly loadAccountInformationsRepository: LoadAccountInformationsRepository) {}

  async load (accountId: string): Promise<LoadAccountInformations.Result> {
    return this.loadAccountInformationsRepository.loadInformations(accountId)
  }
}
