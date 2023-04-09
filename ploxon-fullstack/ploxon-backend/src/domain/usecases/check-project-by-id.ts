export interface CheckProjectById {
  checkById: (projectId: string) => Promise<CheckProjectById.Result>
}

export namespace CheckProjectById {
  export type Result = boolean
}
