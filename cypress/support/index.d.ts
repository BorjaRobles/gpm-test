/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {

        getById(id: string): Chainable<any>
        getByPartialId(id: string): Chainable<any>
        waitForXHR(method: string, url: string): Chainable<any>
        finishLoading(): Chainable<any>
    }
}