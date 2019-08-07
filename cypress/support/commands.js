Cypress.Commands.add('assertLoggedInAs', user => {
  cy.visit('/Login.aspx?lang=EN')
    .getByText(/next/i)
    .get('#LoginControl_UserName')
    .type(`{home}{del}${user.username}{enter}`)
    .focused()
    .type(`${user.password}{enter}`)
})
