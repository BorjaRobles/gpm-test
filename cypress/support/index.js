/// <reference types="../support" />
/// <reference types="cypress" />

// Import commands.js using ES2015 syntax:
import '@testing-library/cypress/add-commands'

import './commands'
import './documents-commands'

// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
