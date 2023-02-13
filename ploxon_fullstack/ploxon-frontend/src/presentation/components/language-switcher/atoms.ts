import { atom } from 'recoil'

export const languageState = atom({
  key: 'linguageState',
  default: 'fr'
})

export const menuState = atom({
  key: 'menuState ',
  default: true
})
