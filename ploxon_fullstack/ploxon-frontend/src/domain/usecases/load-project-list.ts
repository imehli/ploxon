export interface LoadProjectList {
  loadAll: () => Promise<LoadProjectList.Model[]>
}

export namespace LoadProjectList {
  export type Model = {
    projectId: string
    projectName: string
    projectPublicKey: string
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
}
