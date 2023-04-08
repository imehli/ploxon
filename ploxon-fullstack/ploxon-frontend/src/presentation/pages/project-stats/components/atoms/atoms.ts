import { LoadProjectStats } from '@/domain/usecases'

import { atom } from 'recoil'

export const projectStatsState = atom({
  key: 'projectStatsState',
  default: {
    isLoading: false,
    error: '',
    projectStats: null as LoadProjectStats.Model,
    reload: false
  }
})

export const onProjectAnswerState = atom({
  key: 'onProjectAnswerState',
  default: {
    onAnswer: null as ({ description, resources }) => void
  }
})
