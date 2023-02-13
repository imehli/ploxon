import { ProjectStatsQueryModel } from '@/domain/models'

export interface LoadProjectStats {
  load: () => Promise<LoadProjectStats.Model>
}

export namespace LoadProjectStats {
  export type Model = ProjectStatsQueryModel
}
