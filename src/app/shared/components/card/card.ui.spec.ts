import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { CardUi } from './card.ui';

describe('CardUi Component', () => {
  let component: CardUi;
  let fixture: ComponentFixture<CardUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUi],
    }).compileComponents();

    fixture = TestBed.createComponent(CardUi);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renderiza sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('el componente existe correctamente', () => {
    expect(component instanceof CardUi).toBe(true);
  });

  it('detectChanges no lanza errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});