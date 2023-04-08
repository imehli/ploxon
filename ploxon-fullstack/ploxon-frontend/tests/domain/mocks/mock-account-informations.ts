import { LoadAccountInformations } from '@/domain/usecases'

import faker from 'faker'

export const mockAccountInformationsModel = (): LoadAccountInformations.Model => ({
  name: faker.name.lastName(),
  email: faker.internet.email()
})

export class LoadAccountInformationsSpy implements LoadAccountInformations {
  callsCount = 0
  accountInformations = mockAccountInformationsModel()

  async loadAll (): Promise<LoadAccountInformations.Model> {
    this.callsCount++
    return this.accountInformations
  }
}
