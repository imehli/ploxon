import { ProjectStatsModel } from './project'

export type ProjectStatsQueryModel = {
  accountId: string
  projectId: string
  projectName: string
  description: string
  resources: string
  projectPrivateStatus: string

  stats: ProjectStatsModel
}
