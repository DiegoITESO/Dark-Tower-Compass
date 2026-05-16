describe('Navegación de Usuario Autenticado', () => {
  beforeEach(() => {
    cy.login(); 
    cy.visit('/');
  });

  it('debe mostrar los links protegidos en la navbar después de loguearse', () => {
    cy.get('nav').contains('Personajes').should('be.visible');
    cy.get('nav').contains('Lugares').should('be.visible');

    cy.get('nav').contains('Cuestionario').should('be.visible');
    cy.get('nav').contains('Mi Perfil').should('be.visible');
  });

  it('debe navegar a todas las secciones correctamente', () => {
    const routes = [
      { name: 'Personajes', path: '/characters', verify: 'Lista de Personajes' },
      { name: 'Lugares', path: '/map', verify: 'Mapa' }, // Ajusta el texto según tu vista
      { name: 'Eventos', path: '/events', verify: 'Eventos' },
      { name: 'Cuestionario', path: '/quiz', verify: 'Cuestionario' },
      { name: 'Mi Perfil', path: '/profile', verify: 'Perfil' }
    ];

    routes.forEach((route) => {
      cy.get('nav').contains(route.name).click();

      cy.url().should('include', route.path);

      cy.get('body').should('not.be.empty');
      
    });
  });
});