import Styles from './create-project-styles.scss'
import { createProjectState, Input, SubmitButton, FormStatus } from './components'
import { Footer, LoginHeader } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { AddProject } from '@/domain/usecases'

import { useHistory, Link } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  validation: Validation
  addProject: AddProject
}

const CreateProject: React.FC<Props> = ({ validation, addProject }: Props) => {
  const resetCreateProjectState = useResetRecoilState(createProjectState)
  const history = useHistory()
  const [state, setState] = useRecoilState(createProjectState)
  const { t } = useTranslation()

  useEffect(() => resetCreateProjectState(), [])
  useEffect(() => validate('projectName'), [state.projectName])
  useEffect(() => validate('description'), [state.description])
  useEffect(() => validate('resources'), [state.resources])
  useEffect(() => validate('projectPrivateStatus'), [state.projectPrivateStatus])

  const validate = (field: string): void => {
    const { projectName, description, resources, projectPrivateStatus } = state
    const formData = { projectName, description, resources, projectPrivateStatus }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.projectNameError || !!old.descriptionError || !!old.resourcesError || !!old.projectPrivateStatusError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(old => ({ ...old, isLoading: true }))
      await addProject.add({
        projectName: state.projectName,
        description: state.description,
        resources: state.resources,
        projectPrivateStatus: state.projectPrivateStatus
      })
      history.replace('/projects')
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.createProjectWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>{t('createProject.header')}</h2>
        <Input type="text" name="projectName" placeholder={t('createProject.input1')} />
        <Input type="text" name="description" placeholder={t('createProject.input2')}/>
        <Input type="text" name="resources" placeholder={t('createProject.input3')} />
        <Input type="text" name="projectPrivateStatus" placeholder={t('createProject.input4')} />
        <SubmitButton text={t('createProject.submit1')} />
        <Link data-testid="account-link" replace to="/account" className={Styles.link}>{t('createProject.link1')}</Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default CreateProject
