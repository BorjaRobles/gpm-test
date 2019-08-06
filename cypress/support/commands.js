Cypress.Commands.add('assertLoggedInAs', () => {
  cy.visit('/Login.aspx?lang=EN')
    .getByText(/next/i)
    .get('#LoginControl_UserName')
    .type('{home}{del}admin_qa{enter}')
    .focused()
    .type('demo4321{enter}')
})
