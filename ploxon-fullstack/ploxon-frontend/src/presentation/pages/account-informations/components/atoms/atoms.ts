import { LoadAccountInformations } from '@/domain/usecases'

import { atom } from 'recoil'

export const accountInformationsState = atom({
  key: 'accountInformationsState',
  default: {
    accountInformations: null as LoadAccountInformations.Model,
    error: '',
    reload: false
  }
})
