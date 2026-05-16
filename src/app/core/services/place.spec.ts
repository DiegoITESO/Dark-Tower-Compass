import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

vi.mock('@angular/fire/firestore', () => ({
  Firestore: class {},
  collection: vi.fn(),
  collectionData: vi.fn(() => of([])),
}));

import { Place } from './place';
import { Firestore } from '@angular/fire/firestore';

describe('Place service', () => {
  let service: Place;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Place,
        {
          provide: Firestore,
          useValue: {},
        },
      ],
    });

    service = TestBed.inject(Place);
  });

  it('se crea correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('expone places como señal con valor inicial vacío', () => {
    expect(Array.isArray(service.places())).toBe(true);
    expect(service.places()).toEqual([]);
  });
});