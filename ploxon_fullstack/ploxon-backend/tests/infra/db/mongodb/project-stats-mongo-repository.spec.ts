import { ProjectStatsMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddProjectParams, mockAddProjectPrivateParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'
import faker from 'faker'

let projectCollection: Collection
let projectStatsCollection: Collection
let accountCollection: Collection

const makeSut = (): ProjectStatsMongoRepository => {
  return new ProjectStatsMongoRepository()
}

// const mockProject = async (): Promise<ProjectModel> => {
//   const projectId = faker.datatype.uuid()
//   const res = await projectCollection.insertOne({ mockAccountId, projectId, ...mockAddProjectParams(), ...mockAddProjectPrivateParams() })
//   const project = await projectCollection.findOne({ _id: res.insertedId })
//   return MongoHelper.map(project)
// }

const mockAccountId = (): string => {
  return faker.datatype.uuid()
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

  describe('save()', () => {
    test('Should add a project result if its new', async () => {
      const projectId = faker.datatype.uuid()
      const accountId = mockAccountId()
      const res = await projectCollection.insertOne({ mockAccountId, projectId, ...mockAddProjectParams(), ...mockAddProjectPrivateParams() })
      const projects = await projectCollection.findOne({ _id: res.insertedId })
      const sut = makeSut()
      await sut.save({
        projectId: projects.projectId,
        accountId,
        description: projects.description,
        resources: projects.resources,
        date: new Date()
      })
      const projectStats = await projectStatsCollection.findOne({
        projectId: projects.projectId,
        accountId
      })
      expect(projectStats).toBeTruthy()
    })

    test('Should update project result if its not new', async () => {
      const projectId = faker.datatype.uuid()
      const accountId = mockAccountId()
      const res = await projectCollection.insertOne({ mockAccountId, projectId, ...mockAddProjectParams(), ...mockAddProjectPrivateParams() })
      const projects = await projectCollection.findOne({ _id: res.insertedId })
      await projectStatsCollection.insertOne({
        projectId: projects.projectId,
        accountId,
        description: projects.description,
        resources: projects.resources,
        date: new Date()
      })
      const sut = makeSut()
      await sut.save({
        projectId: projects.projectId,
        accountId,
        description: projects.description,
        resources: projects.resources,
        date: new Date()
      })
      const projectStats = await projectStatsCollection
        .find({
          projectId: projects.projectId,
          accountId
        })
        .toArray()
      expect(projectStats).toBeTruthy()
      expect(projectStats.length).toBe(1)
    })
  })

  describe('loadByProjectId()', () => {
    test('Should load project result', async () => {
      // const project = await mockProject()
      // const projects = await mockProject()

      const projectId = faker.datatype.uuid()
      const accountId = mockAccountId()
      const accountId2 = mockAccountId()
      const res = await projectCollection.insertOne({ mockAccountId, projectId, ...mockAddProjectParams(), ...mockAddProjectPrivateParams() })
      const projects = await projectCollection.findOne({ _id: res.insertedId })

      await projectStatsCollection.insertMany([{
        projectId: projects.projectId,
        accountId,
        description: projects.description,
        resources: projects.resources,
        date: new Date()
      }, {
        projectId: projects.projectId,
        accountId2,
        description: projects.description,
        resources: projects.resources,
        date: new Date()
      }])
      const sut = makeSut()
      const projectStats = await sut.loadByProjectId(projects.projectId, accountId)
      expect(projectStats).toBeTruthy()
      expect(projectStats.projectId).toEqual(projects.projectId)
      expect(projectStats.accountId).toEqual(projects.accountId)
      expect(projectStats.description).toEqual(projects.description)
      expect(projectStats.resources).toEqual(projects.resources)
      expect(projectStats.stats).toEqual(projects.stats)
    })

    //   test('Should load project result 2', async () => {
    //     const project = await mockProject()
    //     const accountId = await mockAccountId()
    //     const accountId2 = await mockAccountId()
    //     const accountId3 = await mockAccountId()
    //     await projectStatsCollection.insertMany([{
    //       projectId: new ObjectId(project.projectId),
    //       accountId: new ObjectId(accountId),
    //       resources: project.resourcess[0].resources,
    //       date: new Date()
    //     }, {
    //       projectId: new ObjectId(project.projectId),
    //       accountId: new ObjectId(accountId2),
    //       resources: project.resourcess[1].resources,
    //       date: new Date()
    //     }, {
    //       projectId: new ObjectId(project.projectId),
    //       accountId: new ObjectId(accountId3),
    //       resources: project.resourcess[1].resources,
    //       date: new Date()
    //     }])
    //     const sut = makeSut()
    //     const projectStats = await sut.loadByProjectId(project.projectId, accountId2)
    //     expect(projectStats).toBeTruthy()
    //     expect(projectStats.projectId).toEqual(project.projectId)
    //     expect(projectStats.resourcess[0].count).toBe(2)
    //     expect(projectStats.resourcess[0].percent).toBe(67)
    //     expect(projectStats.resourcess[0].isCurrentAccountResources).toBe(true)
    //     expect(projectStats.resourcess[1].count).toBe(1)
    //     expect(projectStats.resourcess[1].percent).toBe(33)
    //     expect(projectStats.resourcess[1].isCurrentAccountResources).toBe(false)
    //     expect(projectStats.resourcess.length).toBe(project.resourcess.length)
    //   })

    //   test('Should load project result 3', async () => {
    //     const project = await mockProject()
    //     const accountId = await mockAccountId()
    //     const accountId2 = await mockAccountId()
    //     const accountId3 = await mockAccountId()
    //     await projectStatsCollection.insertMany([{
    //       projectId: new ObjectId(project.projectId),
    //       accountId: new ObjectId(accountId),
    //       resources: project.resourcess[0].resources,
    //       date: new Date()
    //     }, {
    //       projectId: new ObjectId(project.projectId),
    //       accountId: new ObjectId(accountId2),
    //       resources: project.resourcess[1].resources,
    //       date: new Date()
    //     }])
    //     const sut = makeSut()
    //     const projectStats = await sut.loadByProjectId(project.projectId, accountId3)
    //     expect(projectStats).toBeTruthy()
    //     expect(projectStats.projectId).toEqual(project.projectId)
    //     expect(projectStats.resourcess[0].count).toBe(1)
    //     expect(projectStats.resourcess[0].percent).toBe(50)
    //     expect(projectStats.resourcess[0].isCurrentAccountResources).toBe(false)
    //     expect(projectStats.resourcess[1].count).toBe(1)
    //     expect(projectStats.resourcess[1].percent).toBe(50)
    //     expect(projectStats.resourcess[1].isCurrentAccountResources).toBe(false)
    //     expect(projectStats.resourcess.length).toBe(project.resourcess.length)
    //   })

  //   test('Should return null if there is no project result', async () => {
  //     const project = await mockProject()
  //     const accountId = await mockAccountId()
  //     const sut = makeSut()
  //     const projectStats = await sut.loadByProjectId(project.projectId, accountId)
  //     expect(projectStats).toBeNull()
  //   })
  })
})
