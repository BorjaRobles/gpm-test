describe('Main Page', () => {
  context('Cookie consent', () => {
    before(() => {
      cy.visit('/').waitForXHR('POST', '/v2/track')
    })

    it('Should appear with the expected text', () => {
      // This is an example for how to use fixtures
      cy.fixture('/cookiesconsenttext.json').then(consent => {
        cy.get('.cookie-consent').should('contain', consent.text)
      })
    })

    context('On accept cookie', () => {
      before(() => {
        cy.get('.cookie-consent__close')
          .click()
          .reload()
          .waitForXHR('POST', '/v2/track')
      })

      it('Accept cookie modal should not appear', () => {
        cy.get('.cookie-consent').should('not.be.visible')
      })
    })
  })

  context('Search for content', () => {
    before(() => {
      cy.visit('/')
        .waitForXHR('POST', '/v2/track')
        .get('.the-header__panel-toggle--search')
        .click()
      cy.focused()
        .type('protocol of test suites{enter}')
        .get('#app-search')
        .scrollTo('center')
    })

    it('Should show top 5 results', () => {
      cy.get('.post-listed__title').should('have.length', 5)
    })

    it('Should show the expected result', () => {
      cy.get('.post-listed__title')
        .contains(/protocol test suites/i)
        .should('be.visible')
    })
  })
})
