import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/projects/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'projects')

describe('Projects', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('projects')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again soon.')
  })

  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('projects')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again soon.')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('projects')
    Helper.testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    cy.visit('projects')
    const { name } = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    mockUnexpectedError()
    cy.visit('projects')
    cy.getByTestId('logout').click().then(() => {
      Helper.testUrl('/login')
    })
  })

  it('Should present projects items', () => {
    mockSuccess()
    cy.visit('projects')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
  })
})
