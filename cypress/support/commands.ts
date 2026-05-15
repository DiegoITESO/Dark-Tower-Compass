Cypress.Commands.add('login', () => {
  // 1. Limpieza total, incluyendo IndexedDB donde Firebase guarda el token
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
    // Esto es clave para Firebase
    win.indexedDB.deleteDatabase('firebaseLocalStorageDb');
  });

  cy.visit('/auth');

  // 2. Verificamos que realmente estemos en auth antes de escribir
  cy.url().should('include', '/auth');

  cy.get('[data-cy="email-input"]', { timeout: 10000 }) // Un poco más de tiempo por si la app carga lento
    .should('be.visible')
    .type('Becerra123@hotmail.com');

  cy.get('[data-cy="password-input"]')
    .type('puki1210');

  // Asegúrate de que el ID coincida con el HTML que pusimos (era submit-button)
  cy.get('[data-cy="submit-button"]')
    .click();

  // 3. Esperar a que la redirección ocurra tras el login exitoso
  cy.url().should('include', '/home');
});