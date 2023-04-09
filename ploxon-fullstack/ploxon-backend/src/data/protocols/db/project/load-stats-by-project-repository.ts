export interface LoadStateByProjectRepository {
  loadState: (projectId: string) => Promise<LoadStateByProjectRepository.Result>
}

export namespace LoadStateByProjectRepository {
  export type Result = {
    projectPrivateStatus: boolean
    status: string
    balance: number
    rate: number
    date: Date
  }
}
