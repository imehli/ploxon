import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'
import { setupApp } from '@/main/config/app'

import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import { Express } from 'express'
import request from 'supertest'

let projectCollection: Collection
let accountCollection: Collection
let app: Express

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Coyote',
    email: 'coyote.white@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Project Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    projectCollection = MongoHelper.getCollection('projects')
    await projectCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /projects', () => {
    test('Should return 403 on add project without accessToken', async () => {
      await request(app)
        .post('/api/projects')
        .send({
          description: 'any description',
          resources: 'any resources'
        })
        .expect(403)
    })

    test('Should return 204 on add project with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/projects')
        .set('x-access-token', accessToken)
        .send({
          description: 'any description',
          resources: 'any resources'
        })
        .expect(204)
    })
  })

  describe('GET /projects', () => {
    test('Should return 403 on load projects without accessToken', async () => {
      await request(app)
        .get('/api/projects')
        .expect(403)
    })

    test('Should return 204 on load projects with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/api/projects')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
