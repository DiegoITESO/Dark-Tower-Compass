import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';
import { provideRouter } from '@angular/router';

import { Navbar } from './navbar';
import { AuthService } from '../../../core/services/auth';

describe('Navbar Component', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  const authServiceMock = {
    userSignal: () => null,
    logout: async () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renderiza sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('inyecta authService correctamente', () => {
    expect(component['authService']).toBeDefined();
  });

  it('detectChanges no lanza errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});