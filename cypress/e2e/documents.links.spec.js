import {documentLinkBuilder} from '../support/generate'
import {
  visitDocuments,
  clearDocuments,
  createLinkDocument,
} from '../support/documents-commands'
import {loginAs} from '../support/commond.commands'

context('Documents', () => {
  describe('Created link on documments', () => {
    beforeEach(() => {
      cy.fixture('/users/admin.json').then(user => {
        loginAs(user)
        visitDocuments()
        clearDocuments()
      })
    })

    it('Appears on list view', () => {
      cy.fixture('/users/admin.json').then(user => {
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
          .waitForXHR('GET', '/**/sfm?folder=-1')

        cy.contains('div', docLink.name)
          .closest('[role="row"]')
          .should('be.visible')
          .and('contain', user.name)
      })
    })

    it('Appears on recent view', () => {
      const docLink = documentLinkBuilder()
      createLinkDocument(docLink)
      cy.get('.recent')
        .click()
        .should('have.class', 'selected')
        .getByText(docLink.name, {exact: false})
        .should('be.visible')
    })

    it('Are findable', () => {
      const docLink = documentLinkBuilder()
      createLinkDocument(docLink)
      cy.get('.react-suggest-icon')
        .click()
        .getByPlaceholderText(/Search document/i)
        .type(`${docLink.name}{enter}`)
        .getByText(docLink.name, {exact: false})
        .should('be.visible')
    })

    it('can be deleted', () => {
      const docLink = documentLinkBuilder()
      createLinkDocument(docLink)

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
      createLinkDocument(docLink)

      cy.contains('div', docLink.name)
        .closest('[role="row"]')
        .click()
        .get('.documents-menu-options-container > :nth-child(2)')
        .click()
        .getByPartialId('undefined-object')
        .click()
        .type('{home}EDITED ')
        .getByText(/save/i)
        .click()

      cy.contains(`EDITED QA -  ${docLink.name}`).should('be.visible')
    })
  })
})
