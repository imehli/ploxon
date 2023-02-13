import { MongoHelper, QueryBuilder } from '@/infra/db'
import { SaveProjectStatsRepository, LoadProjectStatsRepository } from '@/data/protocols/db'

export class ProjectStatsMongoRepository implements SaveProjectStatsRepository, LoadProjectStatsRepository {
  async save (data: SaveProjectStatsRepository.Params): Promise<void> {
    const projectStatsCollection = MongoHelper.getCollection('projectStats')
    await projectStatsCollection.findOneAndUpdate({
      projectId: data.projectId,
      accountId: data.accountId
    }, {
      $set: {
        description: data.description,
        resources: data.resources,
        date: data.date
      }
    }, {
      upsert: true
    })
  }

  async loadByProjectId (projectId: string, accountId: string): Promise<LoadProjectStatsRepository.StatsQuery> {
    const projectStatsCollection = MongoHelper.getCollection('projectStats')
    const query = new QueryBuilder()
      .match({
        projectId: projectId
      })
      .group({
        _id: 0,
        data: {
          $push: '$$ROOT'
        },
        total: {
          $sum: 1
        }
      })
      .unwind({
        path: '$data'
      })
      .lookup({
        from: 'projects',
        localField: 'data.projectId',
        foreignField: 'projectId',
        as: 'project'
      })
      .unwind({
        path: '$project'
      })
      .group({
        _id: {
          accountId: '$project.accountId',
          projectId: '$project.projectId',
          projectName: '$project.projectName',
          description: '$project.description',
          resources: '$project.resources',
          stats: '$project.stats',
          total: '$total'
        }
      })
      .project({
        _id: 0,
        accountId: '$_id.accountId',
        projectId: '$_id.projectId',
        projectName: '$_id.projectName',
        description: '$_id.description',
        resources: '$_id.resources',
        stats: '$_id.stats'
        // total: '$_id.total'
      })
      .build()
    const projectStats = await projectStatsCollection.aggregate<LoadProjectStatsRepository.StatsQuery>(query).toArray()
    return projectStats.length ? projectStats[0] : null
  }
}
