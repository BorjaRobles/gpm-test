export const loginAs = user => {
  cy.visit('/Login.aspx?lang=EN')
    .getByText(/next/i)
    .get('#LoginControl_UserName')
    .type(`{home}{del}${user.username}{enter}`)
    .focused()
    .type(`${user.password}{enter}`)
    .waitForXHR('POST', '/ASMX/Proxy.asmx/GetLoginToken')
}
