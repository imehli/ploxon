import { ProjectStatsQueryModel } from '@/domain/models'

export interface AddProject {
  add: (params: AddProject.Params) => Promise<AddProject.Model>
}

export namespace AddProject {
  export type Params = {
    projectName: string
    description: string
    resources: string
    projectPrivateStatus: string
  }

  export type Model = ProjectStatsQueryModel
}
