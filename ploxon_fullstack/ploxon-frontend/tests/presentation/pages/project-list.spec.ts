import { ProjectList } from '@/presentation/pages'
import { AccountModel } from '@/domain/models'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { LoadProjectListSpy } from '@/tests/domain/mocks'
import { renderWithHistory } from '@/tests/presentation/mocks'

import { screen, waitFor, fireEvent } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  loadProjectListSpy: LoadProjectListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadProjectListSpy = new LoadProjectListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => ProjectList({ loadProjectList: loadProjectListSpy })
  })
  return {
    loadProjectListSpy,
    history,
    setCurrentAccountMock
  }
}

describe('ProjectList Component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    const projectList = screen.getByTestId('project-list')

    expect(projectList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => projectList)
  })

  test('Should call LoadProjectList', async () => {
    const { loadProjectListSpy } = makeSut()

    expect(loadProjectListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render ProjectItems on success', async () => {
    makeSut()
    const projectList = screen.getByTestId('project-list')
    await waitFor(() => projectList)

    expect(projectList.querySelectorAll('li.projectItemWrap')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on UnexpectedError', async () => {
    const loadProjectListSpy = new LoadProjectListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadProjectListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadProjectListSpy)
    await waitFor(() => screen.getByRole('heading'))

    expect(screen.queryByTestId('project-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadProjectListSpy = new LoadProjectListSpy()
    jest.spyOn(loadProjectListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock, history } = makeSut(loadProjectListSpy)
    await waitFor(() => screen.getByRole('heading'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should call LoadProjectList on reload', async () => {
    const loadProjectListSpy = new LoadProjectListSpy()
    jest.spyOn(loadProjectListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadProjectListSpy)
    await waitFor(() => screen.getByRole('heading'))

    fireEvent.click(screen.getByTestId('reload'))

    expect(loadProjectListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
