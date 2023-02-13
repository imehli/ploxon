import { AccountInformationsModel } from '@/domain/models'

export interface LoadAccountInformationsRepository {
  loadInformations: (accountId: string) => Promise<LoadAccountInformationsRepository.Result>
}

export namespace LoadAccountInformationsRepository {
  export type Result = AccountInformationsModel
}
