import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { LibraryId } from './library-id';
import { AuthService } from '../../../core/services/auth';
import { User as UserService } from '../../../core/services/user';

describe('LibraryId Component', () => {
  let component: LibraryId;
  let fixture: ComponentFixture<LibraryId>;

  const mockAuthService = {
    userSignal: vi.fn(() => ({
      uid: '123',
    })),
  };

  const mockUserService = {
    getProfile: vi.fn().mockResolvedValue({
      displayName: 'Fabricio',
      birthDate: '2000-01-01',
      favoriteBook: 'IT',
      photoUrl: 'photo.jpg',
    }),

    updateProfile: vi.fn().mockResolvedValue(undefined),

    uploadProfilePicture: vi.fn().mockResolvedValue('new-photo.jpg'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryId],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryId);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renderiza sin errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('carga datos del perfil en ngOnInit', () => {
    expect(component.formData.name).toBe('Fabricio');
    expect(component.formData.favoriteBook).toBe('IT');
  });

  it('saveProfile llama updateProfile', async () => {
    await component.saveProfile();

    expect(mockUserService.updateProfile).toHaveBeenCalled();
  });

  it('onFileSelected actualiza la foto', async () => {
    const file = new File(['test'], 'test.png', {
      type: 'image/png',
    });

    const event = {
      target: {
        files: [file],
      },
    } as any;

    await component.onFileSelected(event);

    expect(mockUserService.uploadProfilePicture).toHaveBeenCalled();
    expect(component.formData.photoUrl).toBe('new-photo.jpg');
  });

  it('isUploading vuelve a false al terminar', async () => {
    const file = new File(['test'], 'test.png', {
      type: 'image/png',
    });

    const event = {
      target: {
        files: [file],
      },
    } as any;

    await component.onFileSelected(event);

    expect(component.isUploading).toBe(false);
  });
});