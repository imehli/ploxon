import { atom } from 'recoil'

export const createProjectState = atom({
  key: 'createProjectState',
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
