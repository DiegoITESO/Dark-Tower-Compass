import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from './auth';

import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

import {
  describe,
  beforeEach,
  it,
  expect,
  vi,
} from 'vitest';

describe('Auth Component', () => {
  let component: Auth;
  let fixture: ComponentFixture<Auth>;

  const authServiceMock = {
    login: vi.fn(),
    register: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auth],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Auth);

    component = fixture.componentInstance;

    vi.clearAllMocks();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inicia en modo login', () => {
    expect(component.isLogin()).toBe(true);
  });

  it('toggleMode cambia entre login y register', () => {
    component.toggleMode();

    expect(component.isLogin()).toBe(false);

    component.toggleMode();

    expect(component.isLogin()).toBe(true);
  });

  it('toggleMode limpia errores y confirmPassword', () => {
    component.errorMessage.set('error');

    component.confirmPassword = '123456';

    component.toggleMode();

    expect(component.errorMessage()).toBe('');

    expect(component.confirmPassword).toBe('');
  });

  describe('handleSubmit()', () => {
    it('no hace nada si email o password están vacíos', async () => {
      component.email = '';
      component.password = '';

      await component.handleSubmit();

      expect(authServiceMock.login).not.toHaveBeenCalled();
    });

    it('hace login correctamente', async () => {
      authServiceMock.login.mockResolvedValueOnce(undefined);

      component.email = 'test@test.com';
      component.password = '123456';

      await component.handleSubmit();

      expect(authServiceMock.login).toHaveBeenCalledWith(
        'test@test.com',
        '123456'
      );

      expect(routerMock.navigate).toHaveBeenCalledWith([
        '/home',
      ]);
    });

    it('hace register correctamente', async () => {
      authServiceMock.register.mockResolvedValueOnce(undefined);

      component.toggleMode();

      component.email = 'test@test.com';
      component.password = '123456';
      component.confirmPassword = '123456';

      await component.handleSubmit();

      expect(authServiceMock.register).toHaveBeenCalledWith(
        'test@test.com',
        '123456'
      );

      expect(routerMock.navigate).toHaveBeenCalledWith([
        '/home',
      ]);
    });

    it('muestra error si las contraseñas no coinciden', async () => {
      component.toggleMode();

      component.email = 'test@test.com';
      component.password = '123456';
      component.confirmPassword = 'abcdef';

      await component.handleSubmit();

      expect(component.errorMessage()).toBe(
        'Las contraseñas no coinciden.'
      );

      expect(authServiceMock.register).not.toHaveBeenCalled();
    });

    it('maneja auth/invalid-email', async () => {
      authServiceMock.login.mockRejectedValueOnce({
        code: 'auth/invalid-email',
      });

      component.email = 'bademail';
      component.password = '123456';

      await component.handleSubmit();

      expect(component.errorMessage()).toBe(
        'Email inválido.'
      );
    });

    it('maneja auth/wrong-password', async () => {
      authServiceMock.login.mockRejectedValueOnce({
        code: 'auth/wrong-password',
      });

      component.email = 'test@test.com';
      component.password = 'badpass';

      await component.handleSubmit();

      expect(component.errorMessage()).toBe(
        'Usuario o contraseña incorrectos.'
      );
    });

    it('maneja errores nativos de JS', async () => {
      authServiceMock.login.mockRejectedValueOnce(
        new Error('Error interno')
      );

      component.email = 'test@test.com';
      component.password = '123456';

      await component.handleSubmit();

      expect(component.errorMessage()).toContain(
        'Error interno'
      );
    });

    it('loading vuelve a false al finalizar', async () => {
      authServiceMock.login.mockResolvedValueOnce(undefined);

      component.email = 'test@test.com';
      component.password = '123456';

      await component.handleSubmit();

      expect(component.loading()).toBe(false);
    });
  });
});