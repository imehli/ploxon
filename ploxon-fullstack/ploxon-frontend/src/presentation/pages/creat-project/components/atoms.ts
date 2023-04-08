import { atom } from 'recoil'

export const creatProjectState = atom({
  key: 'creatProjectState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    projectName: '',
    description: '',
    resources: '',
    projectPrivateStatus: '',
    projectNameError: '',
    descriptionError: '',
    resourcesError: '',
    projectPrivateStatusError: '',
    mainError: ''
  }
})
