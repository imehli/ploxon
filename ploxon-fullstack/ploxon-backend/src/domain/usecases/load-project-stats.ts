import { ProjectStatsQueryModel } from '@/domain/models'

export interface LoadProjectStats {
  load: (projectId: string, accountId: string) => Promise<LoadProjectStats.Result>
}

export namespace LoadProjectStats {
  export type Result = ProjectStatsQueryModel
}
