Cypress.Commands.add('assertLoggedInAs', user => {
  cy.visit('/Login.aspx?lang=EN')
    .getByText(/next/i)
    .get('#LoginControl_UserName')
    .type(`{home}{del}${user.username}{enter}`)
    .focused()
    .type(`${user.password}{enter}`)
})

Cypress.Commands.add('getById', id => {
  cy.get(`#${id}`)
})

Cypress.Commands.add('getByPartialId', id => {
  cy.get(`[id*="${id}"]`)
})
