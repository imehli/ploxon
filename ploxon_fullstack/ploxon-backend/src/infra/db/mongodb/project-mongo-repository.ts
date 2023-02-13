import { MongoHelper, QueryBuilder } from '@/infra/db'
import { AddProjectRepository, LoadProjectsRepository, LoadProjectByIdRepository, CheckProjectByIdRepository, LoadStateByProjectRepository } from '@/data/protocols/db'

import { ObjectId } from 'mongodb'
import { UUID } from 'bson'

export class ProjectMongoRepository implements AddProjectRepository, LoadProjectsRepository, LoadProjectByIdRepository, CheckProjectByIdRepository, LoadStateByProjectRepository {
  async add (data: AddProjectRepository.Params): Promise<void> {
    const projectCollection = MongoHelper.getCollection('projects')
    const projectId = new UUID().toHexString()
    const privateParams = {
      projectPublicKey: new UUID().toHexString(), // fake public key, will be substituted when implementing DAO system.
      stats: {
        status: 'Draft',
        balance: 0,
        rate: 0,
        date: new Date()
      }
    }
    await projectCollection.insertOne({ projectId, ...data, ...privateParams })
  }

  async loadAll (accountId: string): Promise<LoadProjectsRepository.Result> {
    const projectCollection = MongoHelper.getCollection('projects')
    const query = new QueryBuilder()
      .lookup({
        from: 'projectStats',
        foreignField: 'projectId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        projectName: 1,
        projectId: 1,
        description: 1,
        resources: 1,
        projectPrivateStatus: 1,
        projectPublicKey: 1,
        createdAt: 1,
        stats: 1
      })
      .build()
    const projects = await projectCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(projects)
  }

  async loadById (projectId: string): Promise<LoadProjectByIdRepository.Result> {
    const projectCollection = MongoHelper.getCollection('projects')
    const project = await projectCollection.findOne({ projectId: projectId })
    return project && MongoHelper.map(project)
  }

  async loadState (id: string): Promise<LoadStateByProjectRepository.Result> {
    const projectCollection = MongoHelper.getCollection('projects')
    const query = new QueryBuilder()
      .match({
        _id: new ObjectId(id)
      })
      .project({
        _id: 0,
        stats: '$stats'
      })
      .build()
    const projects = await projectCollection.aggregate(query).toArray()
    return projects[0]?.stats || []
  }

  async checkById (projectId: string): Promise<CheckProjectByIdRepository.Result> {
    const projectCollection = MongoHelper.getCollection('projects')
    const project = await projectCollection.findOne({
      projectId
    }, {
      projection: {
        projectId: 1
      }
    })
    return project !== null
  }
}
