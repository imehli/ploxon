import { SaveProjectStats } from '@/domain/usecases'

export interface SaveProjectStatsRepository {
  save: (data: SaveProjectStatsRepository.Params) => Promise<void>
}

export namespace SaveProjectStatsRepository {
  export type Params = SaveProjectStats.Params
}
