import { TestBed } from '@angular/core/testing';
import { User } from './user';
import {
  Firestore,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';

import {
  Storage as FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

import { vi, describe, beforeEach, it, expect } from 'vitest';

vi.mock('@angular/fire/firestore', async () => {
  const actual = await vi.importActual<any>('@angular/fire/firestore');

  return {
    ...actual,
    doc: vi.fn(() => 'mock-doc-ref'),
    getDoc: vi.fn(),
    updateDoc: vi.fn(),
  };
});

vi.mock('@angular/fire/storage', async () => {
  const actual = await vi.importActual<any>('@angular/fire/storage');

  return {
    ...actual,
    ref: vi.fn(() => 'mock-storage-ref'),
    uploadBytes: vi.fn(),
    getDownloadURL: vi.fn(),
  };
});

const firestoreMock = {};
const storageMock = {};

describe('User service', () => {
  let service: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        User,
        { provide: Firestore, useValue: firestoreMock },
        { provide: FirebaseStorage, useValue: storageMock },
      ],
    });

    service = TestBed.inject(User);

    vi.clearAllMocks();
  });

  it('se crea correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('getProfile()', () => {
    it('retorna el perfil si el documento existe', async () => {
      const mockProfile = {
        email: 'roland@darkworld.com',
        role: 'user',
      };

      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockProfile,
      } as any);

      const result = await service.getProfile('uid-123');

      expect(result).toEqual(mockProfile);
    });

    it('retorna undefined si el documento no existe', async () => {
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => false,
      } as any);

      const result = await service.getProfile('uid-inexistente');

      expect(result).toBeUndefined();
    });
  });

  describe('updateProfile()', () => {
    it('actualiza el perfil sin errores', async () => {
      vi.mocked(updateDoc).mockResolvedValueOnce(undefined);

      await expect(
        service.updateProfile('uid-123', {
          displayName: 'Roland',
        })
      ).resolves.not.toThrow();

      expect(updateDoc).toHaveBeenCalled();
    });
  });

  describe('uploadProfilePicture()', () => {
    it('sube la foto y retorna la URL', async () => {
      vi.mocked(uploadBytes).mockResolvedValueOnce({} as any);

      vi.mocked(getDownloadURL).mockResolvedValueOnce(
        'https://url.com/photo.jpg'
      );

      const mockFile = new File(
        ['img'],
        'photo.jpg',
        { type: 'image/jpeg' }
      );

      const result = await service.uploadProfilePicture(
        'uid-123',
        mockFile
      );

      expect(uploadBytes).toHaveBeenCalled();
      expect(getDownloadURL).toHaveBeenCalled();
      expect(result).toBe('https://url.com/photo.jpg');
    });
  });
});