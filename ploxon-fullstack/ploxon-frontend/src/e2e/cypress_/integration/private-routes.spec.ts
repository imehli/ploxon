import * as Helper from '../utils/helpers'

describe('Private Routes', () => {
  it('Should logout if projects has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('Should logout if project-stats has no token', () => {
    cy.visit('/projects/any_id')
    Helper.testUrl('/login')
  })
})
