import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Storage as FirebaseStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('@angular/fire/auth', async () => {
  const actual = await vi.importActual<any>('@angular/fire/auth');

  return {
    ...actual,
    signOut: vi.fn().mockResolvedValue(undefined),
  };
});

const authMock = {
  currentUser: { uid: 'uid-123', email: 'test@example.com' },

  onAuthStateChanged: vi.fn(),

  onIdTokenChanged: vi.fn(),

  signOut: vi.fn().mockResolvedValue(undefined),
};

const firestoreMock = {
  app: {},
  type: 'firestore',
};

const storageMock = {
  app: {},
  type: 'storage',
};

const routerMock = {
  navigate: vi.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: authMock },
        { provide: Firestore, useValue: firestoreMock },
        { provide: FirebaseStorage, useValue: storageMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(AuthService);

    vi.clearAllMocks();
  });

  it('se crea correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('expone userSignal como señal', () => {
    expect(service.userSignal).toBeDefined();
  });

  describe('logout()', () => {
  it('redirige a /login después de cerrar sesión', async () => {
    await service.logout();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});

  describe('deleteAccount()', () => {
    it('no hace nada si no hay usuario autenticado', async () => {
      (service as any).auth = { currentUser: null };

      await expect(service.deleteAccount()).resolves.not.toThrow();
    });
  });
});