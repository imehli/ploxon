import { LoadProjectList } from '@/domain/usecases'

import { atom } from 'recoil'

export const projectListState = atom({
  key: 'projectListState',
  default: {
    projects: [] as LoadProjectList.Model[],
    error: '',
    reload: false
  }
})
