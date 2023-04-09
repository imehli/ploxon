import { MongoHelper } from '@/infra/db'
import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, CheckAccountByEmailRepository, LoadAccountInformationsRepository } from '@/data/protocols/db'
import { UUID } from 'bson'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, CheckAccountByEmailRepository, LoadAccountInformationsRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const accountID = new UUID().toHexString()
    const result = await accountCollection.insertOne({ ...data, accountId: accountID })
    return !!accountID && result.insertedId !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        accountId: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async loadInformations (accountId: string): Promise<LoadAccountInformationsRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accountId
    }, {
      projection: {
        accountId: 1,
        name: 1,
        email: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account !== null
  }

  async updateAccessToken (accountId: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      accountId
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    }, {
      projection: {
        accountId: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
