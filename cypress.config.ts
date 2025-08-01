import { defineConfig } from "cypress";

export default defineConfig({
    reporter: 'cypress-mochawesome-reporter',
	video: false,
    e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
