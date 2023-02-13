import { ProjectModel } from '@/domain/models'

export interface LoadProjectByIdRepository {
  loadById: (projectId: string) => Promise<LoadProjectByIdRepository.Result>
}

export namespace LoadProjectByIdRepository {
  export type Result = ProjectModel
}
