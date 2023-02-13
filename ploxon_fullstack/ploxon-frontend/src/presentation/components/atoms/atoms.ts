import { AccountModel, ProjectStatsQueryModel } from '@/domain/models'

import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    getCurrentAccount: null as () => AccountModel,
    setCurrentAccount: null as (account: AccountModel) => void
  }
})

export const currentProjectState = atom({
  key: 'currentProjectState',
  default: {
    getCurrentProject: null as () => ProjectStatsQueryModel,
    setCurrentProject: null as (project: ProjectStatsQueryModel) => void
  }
})
