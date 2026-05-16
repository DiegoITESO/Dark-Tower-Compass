describe('Quiz Page', () => {

  beforeEach(() => {
    cy.login();

    cy.visit('/quiz?debug=true');

    cy.get('h2').contains('El Cuestionario del Destino').should('be.visible');

    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="reset-test-button"]').length > 0) {
        cy.get('[data-cy="reset-test-button"]').click();
        cy.get('[data-cy="quiz-form"]').should('be.visible');
      }
    });
  });

  it('renderiza el cuestionario', () => {
    cy.get('[data-cy="quiz-form"]').should('exist');
  });

  it('el botón inicia deshabilitado', () => {
    cy.get('[data-cy="submit-quiz"]')
      .should('be.disabled');
  });

  it('habilita el botón al responder todo', () => {
    // Seleccionamos la opción "a" de cada pregunta
    for (let i = 1; i <= 5; i++) {
      cy.get(`[data-cy="q${i}-a"]`).check();
    }

    cy.get('[data-cy="submit-quiz"]')
      .should('not.be.disabled');
  });

  it('envía el quiz y muestra resultado', () => {
    for (let i = 1; i <= 5; i++) {
      cy.get(`[data-cy="q${i}-a"]`).check();
    }

    cy.get('[data-cy="submit-quiz"]').click();
    cy.get('[data-cy="quiz-result"]', { timeout: 10000 }).should('be.visible');
    
    cy.get('[data-cy="character-name"]')
      .should('not.be.empty')
      .and('be.visible');
  });

  it('muestra botón aceptar destino y permite navegar', () => {
    for (let i = 1; i <= 5; i++) {
      cy.get(`[data-cy="q${i}-a"]`).check();
    }

    cy.get('[data-cy="submit-quiz"]').click();
    cy.get('[data-cy="accept-destiny"]')
      .should('be.visible')
      .click();
    cy.url().should('include', '/home');
  });

});