import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/account/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'POST')
const mockSuccess = (): void => Http.mockOk(path, 'POST', 'account-informations')

describe('AccountInformations', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('account')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again soon.')
  })

  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('account')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again soon.')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 3)
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('account')
    Helper.testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    cy.visit('account')
    const { name } = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    mockUnexpectedError()
    cy.visit('account')
    cy.getByTestId('logout').click().then(() => {
      Helper.testUrl('/login')
    })
  })

  it('Should present account informations (properties)', () => {
    mockSuccess()
    cy.visit('account')
    cy.get('li').should('have.length', 3)
  })
})
