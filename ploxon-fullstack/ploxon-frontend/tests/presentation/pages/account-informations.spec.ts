import { AccountInformations } from '@/presentation/pages'
import { AccountModel } from '@/domain/models'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { LoadAccountInformationsSpy } from '@/tests/domain/mocks'
import { renderWithHistory } from '@/tests/presentation/mocks'

import { screen, waitFor, fireEvent } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  loadAccountInformationsSpy: LoadAccountInformationsSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadAccountInformationsSpy = new LoadAccountInformationsSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/account'] })
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => AccountInformations({ loadAccountInformations: loadAccountInformationsSpy })
  })
  return {
    loadAccountInformationsSpy,
    history,
    setCurrentAccountMock
  }
}

describe('AccountInformations Component', () => {
  test('Should call LoadAccountInformations', async () => {
    const { loadAccountInformationsSpy } = makeSut()

    expect(loadAccountInformationsSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render account informations on success', async () => {
    makeSut()
    const accountInformations = screen.getByTestId('informations-list')
    await waitFor(() => accountInformations)

    expect(accountInformations.querySelectorAll('li')).toHaveLength(2)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on UnexpectedError', async () => {
    const loadAccountInformationsSpy = new LoadAccountInformationsSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadAccountInformationsSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadAccountInformationsSpy)
    await waitFor(() => screen.getByRole('heading'))

    expect(screen.queryByTestId('informations-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadAccountInformationsSpy = new LoadAccountInformationsSpy()
    jest.spyOn(loadAccountInformationsSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock, history } = makeSut(loadAccountInformationsSpy)
    await waitFor(() => screen.getByRole('heading'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should call LoadProjectList on reload', async () => {
    const loadAccountInformationsSpy = new LoadAccountInformationsSpy()
    jest.spyOn(loadAccountInformationsSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadAccountInformationsSpy)
    await waitFor(() => screen.getByRole('heading'))

    fireEvent.click(screen.getByTestId('reload'))

    expect(loadAccountInformationsSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
