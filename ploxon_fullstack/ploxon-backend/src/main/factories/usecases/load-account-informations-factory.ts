import { DbLoadAccountInformations } from '@/data/usecases'
import { LoadAccountInformations } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbLoadAccountInformations = (): LoadAccountInformations => {
  const accountInformationsMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountInformations(accountInformationsMongoRepository)
}
