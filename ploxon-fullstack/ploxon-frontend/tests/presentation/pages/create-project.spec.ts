import { CreateProject } from '@/presentation/pages'
import { EmailInUseError } from '@/domain/errors'
import { AddProject } from '@/domain/usecases'
import { Helper, renderWithHistory, ValidationStub } from '@/tests/presentation/mocks'
import { AddProjectSpy } from '@/tests/domain/mocks'

import { createMemoryHistory } from 'history'
import faker from 'faker'
import { fireEvent, waitFor, screen } from '@testing-library/react'

type SutTypes = {
  addProjectSpy: AddProjectSpy
  setCurrentProjectMock: (project: AddProject.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/creatproject'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addProjectSpy = new AddProjectSpy()
  const { setCurrentProjectMock } = renderWithHistory({
    history,
    Page: () => CreateProject({ validation: validationStub, addProject: addProjectSpy })
  })
  return {
    addProjectSpy,
    setCurrentProjectMock
  }
}

const simulateValidSubmit = async (projectName = faker.name.findName(), description = faker.random.words(), resources = faker.random.words(), projectPrivateStatus = faker.random.words()): Promise<void> => {
  Helper.populateField('projectName', projectName)
  Helper.populateField('description', description)
  Helper.populateField('resources', resources)
  Helper.populateField('projectPrivateStatus', projectPrivateStatus)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('CreateProject Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testStatusForField('projectName', validationError)
    Helper.testStatusForField('description', validationError)
    Helper.testStatusForField('resources', validationError)
    Helper.testStatusForField('projectPrivateStatus', validationError)
  })

  test('Should show projectName error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('projectName')

    Helper.testStatusForField('projectName', validationError)
  })

  test('Should show description error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('description')

    Helper.testStatusForField('description', validationError)
  })

  test('Should show resources error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('resources')

    Helper.testStatusForField('resources', validationError)
  })

  test('Should show projectPrivateStatus error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('projectPrivateStatus')

    Helper.testStatusForField('projectPrivateStatus', validationError)
  })

  test('Should show valid projectName state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('projectName')

    Helper.testStatusForField('projectName')
  })

  test('Should show valid description state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('description')

    Helper.testStatusForField('description')
  })

  test('Should show valid resources state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('resources')

    Helper.testStatusForField('resources')
  })

  test('Should show valid projectPrivateStatus state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('projectPrivateStatus')

    Helper.testStatusForField('projectPrivateStatus')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('projectName')
    Helper.populateField('description')
    Helper.populateField('resources')
    Helper.populateField('projectPrivateStatus')

    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call AddProject with correct values', async () => {
    const { addProjectSpy } = makeSut()
    const projectName = faker.name.findName()
    const description = faker.random.words()
    const resources = faker.random.words()
    const projectPrivateStatus = faker.random.words()

    await simulateValidSubmit(projectName, description, resources, projectPrivateStatus)

    expect(addProjectSpy.params).toEqual({
      projectName,
      description,
      resources,
      projectPrivateStatus
    })
  })

  test('Should call AddProject only once', async () => {
    const { addProjectSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(addProjectSpy.callsCount).toBe(1)
  })

  test('Should not call AddProject if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addProjectSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(addProjectSpy.callsCount).toBe(0)
  })

  test('Should present error if AddProject fails', async () => {
    const { addProjectSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addProjectSpy, 'add').mockRejectedValueOnce(error)

    await simulateValidSubmit()

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  // test('Should call UpdateCurrentProject on success', async () => {
  //   const { addProjectSpy, setCurrentProjectMock } = makeSut()

  //   await simulateValidSubmit()

  //   expect(setCurrentProjectMock).toHaveBeenCalledWith(addProjectSpy.project)
  //   expect(history.length).toBe(1)
  //   expect(history.location.pathname).toBe('/')
  // })

  test('Should go to account informations page', () => {
    makeSut()
    const loginLink = screen.getByTestId('login-link')

    fireEvent.click(loginLink)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/account')
  })
})
