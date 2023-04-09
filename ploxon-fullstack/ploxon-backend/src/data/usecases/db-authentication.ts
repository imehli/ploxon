import { Authentication } from '@/domain/usecases'
import { HashComparer, Encrypter, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.accountId)
        await this.updateAccessTokenRepository.updateAccessToken(account.accountId, accessToken)
        return {
          accessToken,
          name: account.name
        }
      }
    }
    return null
  }
}
