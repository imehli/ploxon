import { AccountInformationsModel } from '@/domain/models'

import faker from 'faker'

export const mockAccountInformations = (): AccountInformationsModel => ({
  accountId: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email()
})
