import Styles from './creat-project-styles.scss'
import { creatProjectState, Input, SubmitButton, FormStatus } from './components'
import { Footer, LoginHeader} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { AddProject } from '@/domain/usecases'

import { useHistory, Link } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import React, { useEffect } from 'react'

type Props = {
  validation: Validation
  addProject: AddProject
}

const CreatProject: React.FC<Props> = ({ validation, addProject }: Props) => {
  const resetCreatProjectState = useResetRecoilState(creatProjectState)
  const history = useHistory()
  const [state, setState] = useRecoilState(creatProjectState)

  useEffect(() => resetCreatProjectState(), [])
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
    <div className={Styles.creatProjectWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Creat a project</h2>
        <Input type="text" name="projectName" placeholder="Type your projectName" />
        <Input type="text" name="description" placeholder="Describe your project" />
        <Input type="text" name="resources" placeholder="Type here your project's resources" />
        <Input type="text" name="projectPrivateStatus" placeholder="choose a status : draft, in prgress ..." />
        <SubmitButton text="Creat Project" />
        <Link data-testid="login-link" replace to="/account" className={Styles.link}>Return to your account</Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default CreatProject
