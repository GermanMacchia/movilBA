import {defineConfig} from "cypress";

export default defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    video: false,
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    e2e: {
        specPattern: ['./**.cy.ts'],
        baseUrl: 'http://localhost:4200',
        setupNodeEvents(on, config) {
        },
    },
});
