import { LoadProjectStats } from '@/domain/usecases'
import { ProjectModel, ProjectStatsQueryModel } from '@/domain/models'
import { LoadProjectStatsRepository, LoadProjectByIdRepository } from '@/data/protocols'

export class DbLoadProjectStats implements LoadProjectStats {
  constructor (
    private readonly loadProjectStatsRepository: LoadProjectStatsRepository,
    private readonly loadProjectByIdRepository: LoadProjectByIdRepository
  ) {}

  async load (projectId: string, accountId: string): Promise<LoadProjectStats.Result> {
    let projectStats = await this.loadProjectStatsRepository.loadByProjectId(projectId, accountId)
    if (!projectStats) {
      const project = await this.loadProjectByIdRepository.loadById(projectId)
      projectStats = this.makeEmptyStats(project)
    }
    return projectStats
  }

  private makeEmptyStats (project: ProjectModel): ProjectStatsQueryModel {
    return {
      accountId: project.accountId,
      projectId: project.projectId,
      projectName: project.projectName,
      description: project.description,
      resources: project.resources,
      projectPrivateStatus: project.projectPrivateStatus,
      stats: {
        status: 'real',
        balance: 0,
        rate: 0,
        date: new Date()
      }
    }
  }
}
