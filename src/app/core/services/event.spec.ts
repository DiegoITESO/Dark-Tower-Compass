import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

vi.mock('@angular/fire/firestore', () => ({
  Firestore: class {},
  collection: vi.fn(),
  collectionData: vi.fn(() => of([])),
}));

import { Event } from './event';
import { Firestore } from '@angular/fire/firestore';

describe('Event service', () => {
  let service: Event;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Event,
        {
          provide: Firestore,
          useValue: {},
        },
      ],
    });

    service = TestBed.inject(Event);
  });

  it('se crea correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('expone events como señal con valor inicial vacío', () => {
    expect(Array.isArray(service.events())).toBe(true);
    expect(service.events()).toEqual([]);
  });
});