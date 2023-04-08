import { ProjectStatsQueryModel } from '@/domain/models'

export interface SaveProjectStats {
  save: (params: SaveProjectStats.Params) => Promise<SaveProjectStats.Model>
}

export namespace SaveProjectStats {
  export type Params = {
    description: string
    resources: string
  }

  export type Model = ProjectStatsQueryModel
}
