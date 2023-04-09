import { ProjectStatsQueryModel } from '@/domain/models'

export interface SaveProjectStats {
  save: (data: SaveProjectStats.Params) => Promise<SaveProjectStats.Result>
}

export namespace SaveProjectStats {
  export type Params = {
    projectId: string
    accountId: string
    description: string
    resources: string
    date: Date
  }

  export type Result = ProjectStatsQueryModel
}
