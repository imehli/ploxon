export interface LoadStateByProject {
  loadState: (id: any) => Promise<LoadStateByProject.Result>
}

export namespace LoadStateByProject {
  export type Result = {
    projectPrivateStatus: boolean
    status: string
    balance: number
    rate: number
    date: Date
  }
}
