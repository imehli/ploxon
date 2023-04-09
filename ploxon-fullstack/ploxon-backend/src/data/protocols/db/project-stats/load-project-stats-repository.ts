import { ProjectStatsQueryModel } from '@/domain/models'

export interface LoadProjectStatsRepository {
  loadByProjectId: (projectId: string, accountId: string) => Promise<LoadProjectStatsRepository.StatsQuery>
}

export namespace LoadProjectStatsRepository {
  export type StatsQuery = ProjectStatsQueryModel
}
