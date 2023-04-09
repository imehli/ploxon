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
    password: '123'
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

  describe('PUT /projects/:projectId/results', () => {
    test('Should return 403 on save project result without accessToken', async () => {
      await request(app)
        .put('/api/projects/any_id/results')
        .send({
          resources: 'any_resources'
        })
        .expect(403)
    })

    test('Should return 200 on save project result with accessToken', async () => {
      const accessToken = await mockAccessToken()
      const res = await projectCollection.insertOne({
        description: 'any description',
        resources: 'any resources'
      })
      await request(app)
        .put(`/api/projects/${res.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .send({
          description: 'any description',
          resources: 'any resources'
        })
        .expect(200)
    })
  })

  describe('GET /projects/:projectId/results', () => {
    test('Should return 403 on load project result without accessToken', async () => {
      await request(app)
        .get('/api/projects/any_id/results')
        .expect(403)
    })

    test('Should return 200 on load project result with accessToken', async () => {
      const accessToken = await mockAccessToken()
      const res = await projectCollection.insertOne({
        description: 'any description',
        resources: 'any resources'
      })
      await request(app)
        .get(`/api/projects/${res.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
