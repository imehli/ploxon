export interface LoadAccountInformations {
  loadAll: () => Promise<LoadAccountInformations.Model>
}

export namespace LoadAccountInformations {
  export type Model = {
    name: string
    email: string
  }
}
