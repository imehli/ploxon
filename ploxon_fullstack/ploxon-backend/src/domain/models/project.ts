export type ProjectModel = {
  id: any
  accountId: string
  projectId: string
  projectPublicKey: string
  projectName: string
  description: string
  resources: string
  projectPrivateStatus: string
  createdAt: Date
  stats: ProjectStatsModel
}

export type ProjectStatsModel = {
  status: string
  balance: number
  rate: number
  date: Date
}
