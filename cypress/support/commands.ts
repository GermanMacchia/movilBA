/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
        /**
         * Devuelve el selector por data-testid
         * @param selector - nombre
         */
		getByTestData(selector: string): Chainable<JQuery<HTMLElement>>;

	}
}

Cypress.Commands.add('getByTestData', (selector) => {
	return cy.get(`[data-testid="${selector}"]`);
});

