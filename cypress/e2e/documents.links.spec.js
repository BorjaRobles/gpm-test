import {documentLinkBuilder} from '../support/generate'

context('Documents', () => {
  describe('Created link on documments', () => {
    beforeEach(() => {
      cy.fixture('/users/admin.json').then(user => {
        cy.assertLoggedInAs(user)
          .visit('/page.aspx#/documents')
          .clearDocuments()
      })
    })

    it('Appears on list view', () => {
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
        .fixture('/users/admin.json')
        .then(user => {
          cy.contains('div', docLink.name)
            .closest('[role="row"]')
            .should('be.visible')
            .and('contain', user.name)
        })
    })

    it('Appears on recents view', () => {
      const docLink = documentLinkBuilder()
      cy.createLinkDocument(docLink)
        .getByText(docLink.name, {exact: false})
        .should('be.visible')
        .get('.recent')
        .click()
        .should('have.class', 'selected')
        .getByText(docLink.name, {exact: false})
        .should('be.visible')
    })

    it('Are findable', () => {
      const docLink = documentLinkBuilder()
      cy.createLinkDocument(docLink)
        .get('.react-suggest-icon')
        .click()
        .getByPlaceholderText(/Search document/i)
        .type(`${docLink.name}{enter}`)
        .getByText(docLink.name, {exact: false})
        .should('be.visible')
    })

    it('can be deleted', () => {
      const docLink = documentLinkBuilder()
      cy.createLinkDocument(docLink)
      cy.contains('div', docLink.name)
        .closest('[role="row"]')
        .click()
        .get('.documents-menu-options-container > :nth-child(3)')
        .click()
        .get('.dialogBlockOutsideClick')
        .contains('span span', 'Delete')
        .click()
      cy.contains(docLink.name).should('not.be.visible')
    })

    it('can be edited', () => {
      const docLink = documentLinkBuilder()
      cy.createLinkDocument(docLink)
      cy.contains('div', docLink.name)
        .closest('[role="row"]')
        .click()
        .get('.documents-menu-options-container > :nth-child(2)')
        .click()
        .get('[id*="undefined-object"]')
        .click()
        .type('{home}EDITED ')
        .getByText(/save/i)
        .click()

      cy.contains(`EDITED QA -  ${docLink.name}`).should('be.visible')
    })
  })
})
