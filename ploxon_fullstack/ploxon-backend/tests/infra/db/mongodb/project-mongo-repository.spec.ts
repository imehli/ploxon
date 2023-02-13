import { ProjectMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddProjectParams, mockAddProjectPrivateParams, mockAddAccountParams } from '@/tests/domain/mocks'

import { Collection, ObjectId } from 'mongodb'
import FakeObjectId from 'bson-objectid'

let projectCollection: Collection
let projectStatsCollection: Collection
let accountCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.insertedId.toHexString()
}

const makeSut = (): ProjectMongoRepository => {
  return new ProjectMongoRepository()
}

describe('ProjectMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    projectCollection = MongoHelper.getCollection('projects')
    await projectCollection.deleteMany({})
    projectStatsCollection = MongoHelper.getCollection('projectStats')
    await projectStatsCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a project on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddProjectParams())
      const count = await projectCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all projects on success', async () => {
      const accountId = await mockAccountId()
      const addProjectModels = [{ ...mockAddProjectParams(), ...mockAddProjectPrivateParams() }, { ...mockAddProjectParams(), ...mockAddProjectPrivateParams() }]
      const result = await projectCollection.insertMany(addProjectModels)
      const project = await projectCollection.findOne({ _id: result.insertedIds[0] })
      await projectStatsCollection.insertOne({
        projectId: project._id,
        accountId: new ObjectId(accountId),
        createdAt: new Date()
      })
      const sut = makeSut()
      const projects = await sut.loadAll(accountId)
      expect(projects.length).toBe(2)
      expect(projects[0].id).toBeTruthy()
      expect(projects[0].createdAt).toBeTruthy()
      expect(projects[0].projectPublicKey).toBeTruthy()
      expect(projects[0].stats).toBeTruthy()
      expect(projects[0].description).toBe(addProjectModels[0].description)
      expect(projects[0].resources).toBe(addProjectModels[0].resources)
      expect(projects[0].projectPrivateStatus).toBe(addProjectModels[0].projectPrivateStatus)
      expect(projects[1].id).toBeTruthy()
      expect(projects[1].createdAt).toBeTruthy()
      expect(projects[1].projectPublicKey).toBeTruthy()
      expect(projects[1].stats).toBeTruthy()
      expect(projects[1].description).toBe(addProjectModels[1].description)
      expect(projects[1].resources).toBe(addProjectModels[1].resources)
      expect(projects[1].projectPrivateStatus).toBe(addProjectModels[1].projectPrivateStatus)
    })

    test('Should load empty list', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const projects = await sut.loadAll(accountId)
      expect(projects.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load project by id on success', async () => {
      const res = await projectCollection.insertOne(mockAddProjectParams())
      const sut = makeSut()
      const project = await sut.loadById(res.insertedId.toHexString())
      expect(project).toBeTruthy()
      expect(project.id).toBeTruthy()
    })

    test('Should return null if project does not exists', async () => {
      const sut = makeSut()
      const project = await sut.loadById(new FakeObjectId().toHexString())
      expect(project).toBeFalsy()
    })
  })

  describe('loadState()', () => {
    test('Should load state on success', async () => {
      const res = await projectCollection.insertOne({ ...mockAddProjectParams(), ...mockAddProjectPrivateParams() })
      const project = await projectCollection.findOne({ _id: res.insertedId })
      const sut = makeSut()
      const state = await sut.loadState(project._id.toHexString())
      expect(state).toEqual(project.stats)
    })

    test('Should return empty array if project does not exists', async () => {
      const sut = makeSut()
      const state = await sut.loadState(new FakeObjectId().toHexString())
      expect(state).toEqual([])
    })
  })

  describe('checkById()', () => {
    test('Should return true if project exists', async () => {
      const res = await projectCollection.insertOne(mockAddProjectParams())
      const sut = makeSut()
      const exists = await sut.checkById(res.insertedId.toHexString())
      expect(exists).toBe(true)
    })

    test('Should return false if project exists', async () => {
      const sut = makeSut()
      const exists = await sut.checkById(new FakeObjectId().toHexString())
      expect(exists).toBe(false)
    })
  })
})
