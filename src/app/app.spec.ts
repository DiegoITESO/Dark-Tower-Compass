import { describe, it, expect } from 'vitest';

import { routes } from './app.routes';
import { authGuard } from './guards/auth-guard';
import { noAuthGuard } from './guards/no-auth-guard';

describe('App Routes', () => {
  it('debe crear el arreglo de rutas', () => {
    expect(routes).toBeTruthy();
    expect(Array.isArray(routes)).toBe(true);
  });

  it('debe contener la ruta home', () => {
    const route = routes.find((r) => r.path === 'home');

    expect(route).toBeTruthy();
    expect(route?.loadComponent).toBeTypeOf('function');
  });

  it('debe contener la ruta characters', () => {
    const route = routes.find((r) => r.path === 'characters');

    expect(route).toBeTruthy();
  });

  it('debe contener la ruta map', () => {
    const route = routes.find((r) => r.path === 'map');

    expect(route).toBeTruthy();
  });

  it('debe contener la ruta events', () => {
    const route = routes.find((r) => r.path === 'events');

    expect(route).toBeTruthy();
  });

  it('ruta auth debe usar noAuthGuard', () => {
    const route = routes.find((r) => r.path === 'auth');

    expect(route).toBeTruthy();
    expect(route?.canActivate).toContain(noAuthGuard);
  });

  it('ruta profile debe usar authGuard', () => {
    const route = routes.find((r) => r.path === 'profile');

    expect(route).toBeTruthy();
    expect(route?.canActivate).toContain(authGuard);
  });

  it('ruta quiz debe usar authGuard', () => {
    const route = routes.find((r) => r.path === 'quiz');

    expect(route).toBeTruthy();
    expect(route?.canActivate).toContain(authGuard);
  });

  it('debe tener redirect vacío a home', () => {
    const route = routes.find((r) => r.path === '');

    expect(route?.redirectTo).toBe('home');
    expect(route?.pathMatch).toBe('full');
  });

  it('debe tener wildcard redirect a home', () => {
    const route = routes.find((r) => r.path === '**');

    expect(route?.redirectTo).toBe('home');
  });
});