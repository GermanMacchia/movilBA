/// <reference types="cypress" />

describe('smoke test', () => {
    it('should visit website', () => {
        cy.visit('/')
        cy.contains('h1', 'MóvilBA')
    })
})
