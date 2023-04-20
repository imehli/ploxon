import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/projects/
const mockLoadSuccess = (): void => Http.mockOk(path, 'GET', 'load-project-stats')

describe('ProjectStats', () => {
  describe('load', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

    beforeEach(() => {
      cy.fixture('account').then(account => {
        Helper.setLocalStorageItem('account', account)
      })
    })

    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.visit('/projects/any_id')
      cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again soon.')
    })

    it('Should reload on button click', () => {
      mockUnexpectedError()
      cy.visit('/projects/any_id')
      cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again soon.')
      mockLoadSuccess()
      cy.getByTestId('reload').click()
      cy.getByTestId('description').should('exist')
    })

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/projects/any_id')
      Helper.testUrl('/login')
    })

    it('Should present project stats', () => {
      mockLoadSuccess()
      cy.visit('/projects/any_id')
    })

    it('Should go to project list on back button click', () => {
      mockLoadSuccess()
      cy.visit('')
      cy.visit('/projects/any_id')
      cy.getByTestId('back-button').click()
      Helper.testUrl('/projects')
    })
  })
})
