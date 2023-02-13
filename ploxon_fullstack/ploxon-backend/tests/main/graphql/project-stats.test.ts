import { MongoHelper } from '@/infra/db'
import env from '@/main/config/env'
import { setupApp } from '@/main/config/app'

import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
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

describe('ProjectStats GraphQL', () => {
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

  describe('ProjectStats Query', () => {
    test('Should return ProjectStats', async () => {
      const accessToken = await mockAccessToken()
      const now = new Date()
      const projectRes = await projectCollection.insertOne({
        projectId: 'projectId',
        projectPublicKey: 'projectPublicKey',
        projectName: 'projectName',
        description: 'description',
        resources: 'resources',
        projectPrivateStatus: 'projectPrivateStatus',
        createdAt: now,
        stats: {
          status: 'status',
          balance: 0,
          rate: 0,
          date: now
        }
      })
      const query = `query {
        projectStats (projectId: "${projectRes.insertedId.toHexString()}") {
          id
          projectId
          projectPublicKey
          projectName
          description
          resources
          projectPrivateStatus
          createdAt
        }
      }`
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.projectStats.resources).toBe('resources')
      expect(res.body.data.projectStats.date).toBe(now.toISOString())
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      const now = new Date()
      const projectRes = await projectCollection.insertOne({
        projectId: 'projectId',
        projectPublicKey: 'projectPublicKey',
        projectName: 'projectName',
        description: 'description',
        resources: 'resources',
        projectPrivateStatus: 'projectPrivateStatus',
        createdAt: now,
        stats: {
          status: 'status',
          balance: 0,
          rate: 0,
          date: now
        }
      })
      const query = `query {
        projectStats (projectId: "${projectRes.insertedId.toHexString()}") {
          id
          projectId
          projectPublicKey
          projectName
          description
          resources
          projectPrivateStatus
          createdAt
        }
      }`
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Access denied')
    })
  })

  describe('SaveProjectStats Mutation', () => {
    test('Should return ProjectStats', async () => {
      const accessToken = await mockAccessToken()
      const now = new Date()
      const projectRes = await projectCollection.insertOne({
        projectId: 'projectId',
        projectPublicKey: 'projectPublicKey',
        projectName: 'projectName',
        description: 'description',
        resources: 'resources',
        projectPrivateStatus: 'projectPrivateStatus',
        createdAt: now,
        stats: {
          status: 'status',
          balance: 0,
          rate: 0,
          date: now
        }
      })
      const query = `mutation {
        saveProjectStats (projectId: "${projectRes.insertedId.toHexString()}", description: "any description") {
          description: 'description',
      }`
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.saveProjectStats.resources).toBe('resources')
      expect(res.body.data.saveProjectStats.date).toBe(now.toISOString())
      expect(res.body.data.projects[0].description).toBe('description')
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      const now = new Date()
      const projectRes = await projectCollection.insertOne({
        projectId: 'projectId',
        projectPublicKey: 'projectPublicKey',
        projectName: 'projectName',
        description: 'description',
        resources: 'resources',
        projectPrivateStatus: 'projectPrivateStatus',
        createdAt: now,
        stats: {
          status: 'status',
          balance: 0,
          rate: 0,
          date: now
        }
      })
      const query = `mutation {
        saveProjectStats (projectId: "${projectRes.insertedId.toHexString()}", description: "any description") {
          description: 'description',
      }`
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Access denied')
    })
  })
})
