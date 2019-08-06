import {documentLinkBuilder} from '../support/generate'

describe('On documents page', () => {
  before(() => {
    cy.assertLoggedInAs()
      .visit('/page.aspx#/documents')
      .clearDocuments()
  })

  it('Created links appears on list', () => {
    const docLink = documentLinkBuilder()

    cy.get('.fm-button__content')
      .click()
      .getByText(/add link/i)
      .click()
      .getByText(/nombre/i)
      .click({force: true})
      .focused()
      .type(`QA -  ${docLink.name}`, {delay: 40})
      .getByText(/^URL/)
      .click({force: true})
      .focused()
      .type(docLink.link, {delay: 30})
      .getByText(/^save/i)
      .click()
      .getByText(docLink.name, {exact: false})
      .should('be.visible')
      .get('.recent')
      .click()
      .getByText(docLink.name, {exact: false})
      .should('be.visible')
    //.deleteDocument(docLink.name)
  })
})
