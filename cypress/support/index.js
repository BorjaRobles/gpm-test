/// <reference types="../support" />
/// <reference types="cypress" />

import '@testing-library/cypress/add-commands'

import 'cypress-file-upload'
// cy.fixture(fileName).then(fileContent => {
//   cy.get('[data-cy="file-input"]').upload({ fileContent, fileName, mimeType: 'application/json' });
// });

import 'cypress-wait-until'
//https://github.com/NoriSte/cypress-wait-until
//cy.waitUntil(() => cy.window().then(win => win.foo === "bar"));

import './commands'
import './documents-commands'

// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

const addContext = require('mochawesome/addContext')

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
    addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
  }
})