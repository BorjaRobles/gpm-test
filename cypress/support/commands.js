Cypress.Commands.add('getById', id => {
  cy.get(`#${id}`)
})

Cypress.Commands.add('getByPartialId', id => {
  cy.get(`[id*="${id}"]`)
})

Cypress.Commands.add('waitForXHR', (method, url) => {
  cy.server()
    .route({
      method: method,
      url: url,
    })
    .as(`${url}`)
    .wait(`@${url}`, {timeout: 10000})
})

Cypress.Commands.add('finishLoading', () => {
  cy.get('.circular-loading', {timeout: 10000}).should('not.exist')
})
