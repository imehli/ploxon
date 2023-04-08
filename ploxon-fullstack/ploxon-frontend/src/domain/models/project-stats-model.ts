export type ProjectStatsQueryModel = {
  accountId: string
  projectId: string
  projectName: string
  description: string
  resources: string
  projectPrivateStatus: string
  stats: {
    status: string
    balance: number
    rate: number
    date: Date
  }
}
