import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

vi.mock('@angular/fire/firestore', () => ({
  Firestore: class {},
  collection: vi.fn(),
  collectionData: vi.fn(() => of([])),
}));

import { Character } from './character';
import { Firestore } from '@angular/fire/firestore';

describe('Character service', () => {
  let service: Character;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Character,
        {
          provide: Firestore,
          useValue: {},
        },
      ],
    });

    service = TestBed.inject(Character);
  });

  it('se crea correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('expone characters como señal con valor inicial vacío', () => {
    expect(Array.isArray(service.characters())).toBe(true);
    expect(service.characters()).toEqual([]);
  });
});