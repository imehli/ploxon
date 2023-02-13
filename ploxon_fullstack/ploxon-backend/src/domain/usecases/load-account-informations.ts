import { AccountInformationsModel } from '@/domain/models'

export interface LoadAccountInformations {
  load: (accountId: string) => Promise<LoadAccountInformations.Result>
}

export namespace LoadAccountInformations {
  export type Result = AccountInformationsModel
}
