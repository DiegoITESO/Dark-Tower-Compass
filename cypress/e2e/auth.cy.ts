describe('Auth Page', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      return new Promise((resolve) => {
        const req = win.indexedDB.deleteDatabase('firebaseLocalStorageDb');
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      });
    });

    cy.visit('/auth');
    cy.url().should('include', '/auth');
  });

  it('carga la pantalla de login', () => {
    cy.contains('Bienvenido').should('exist');
    cy.get('[data-cy="email-input"]').should('exist');
    cy.get('[data-cy="password-input"]').should('exist');
    cy.get('[data-cy="submit-button"]')
      .should('exist')
      .and('contain', 'Iniciar Sesión');
  });

  it('muestra errores de validación', () => {
    cy.get('[data-cy="email-input"]')
      .type('correo-invalido')
      .blur();

    cy.get('[data-cy="password-input"]')
      .type('123')
      .blur();

    cy.get('[data-cy="email-error"]').should('exist');
    cy.get('[data-cy="password-error"]').should('exist');
  });

  it('cambia a modo registro', () => {
    cy.get('[data-cy="toggle-mode"]').click();
    cy.contains('Únete').should('exist');
    cy.get('[data-cy="confirm-password-input"]').should('exist');
    cy.get('[data-cy="submit-button"]').should('contain', 'Crear Cuenta');
  });

  it('muestra error si passwords no coinciden', () => {
    cy.get('[data-cy="toggle-mode"]').click();
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="confirm-password-input"]').type('abcdef');
    cy.get('[data-cy="confirm-password-input"]').blur();
    cy.get('[data-cy="confirm-error"]').should('exist');
  });

  it('deshabilita submit si formulario inválido', () => {
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it('habilita submit con datos válidos en login', () => {
    cy.get('[data-cy="email-input"]').type('test@test.com');
    cy.get('[data-cy="password-input"]').type('123456');
    cy.get('[data-cy="submit-button"]').should('not.be.disabled');
  });
});