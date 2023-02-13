import { ProjectStats } from '@/presentation/pages'
import { projectStatsState } from '@/presentation/pages/project-stats/components'
import { AccountModel } from '@/domain/models'
import { LoadProjectStatsSpy, SaveProjectStatsSpy } from '@/tests/domain/mocks'
import { renderWithHistory } from '@/tests/presentation/mocks'

import { screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { LoadProjectStats } from '@/domain/usecases'

type SutTypes = {
  loadProjectStatsSpy: LoadProjectStatsSpy
  saveProjectStatsSpy: SaveProjectStatsSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  loadProjectStatsSpy?: LoadProjectStatsSpy
  saveProjectStatsSpy?: SaveProjectStatsSpy
  initialState?: {
    isLoading: boolean
    error: string
    projectStats: LoadProjectStats.Model
    reload: boolean
  }
}

const makeSut = ({ loadProjectStatsSpy = new LoadProjectStatsSpy(), saveProjectStatsSpy = new SaveProjectStatsSpy(), initialState = null }: SutParams = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/', '/projects/any_id'], initialIndex: 1 })
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => ProjectStats({ loadProjectStats: loadProjectStatsSpy, saveProjectStats: saveProjectStatsSpy }),
    states: initialState ? [{ atom: projectStatsState, value: initialState }] : []
  })
  return {
    loadProjectStatsSpy,
    saveProjectStatsSpy,
    history,
    setCurrentAccountMock
  }
}

describe('ProjectStats Component', () => {
  test('Should present correct initial state', async () => {
    makeSut()
    const projectStats = screen.getByTestId('project-stats')

    expect(projectStats.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    await waitFor(() => projectStats)
  })

  test('Should call LoadProjectStats', async () => {
    const { loadProjectStatsSpy } = makeSut()
    await waitFor(() => screen.getByTestId('project-stats'))

    expect(loadProjectStatsSpy.callsCount).toBe(1)
  })
})
