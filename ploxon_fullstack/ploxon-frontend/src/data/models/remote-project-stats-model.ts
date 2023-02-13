export type RemoteProjectStatsModel = {
  projectId: string
  projectPublicKey: string
  description: string
  resources: string
  projectPrivateStatus: boolean
  date: Date
  stats: ProjectStatsModel
}

export type ProjectStatsModel = {
  status: string
  balance: number
  rate: number
  date: Date
}
