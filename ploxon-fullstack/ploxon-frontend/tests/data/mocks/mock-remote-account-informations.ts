import { RemoteLoadAccountInformations } from '@/data/usecases'

import faker from 'faker'

export const mockRemoteAccountInformations = (): RemoteLoadAccountInformations.Model => ({
  name: faker.name.lastName(),
  email: faker.internet.email()
})
