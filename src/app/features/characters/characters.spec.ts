import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Characters } from './characters';

import { Character } from '../../core/services/character';
import { AuthService } from '../../core/services/auth';

import { signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('Characters', () => {
  let component: Characters;
  let fixture: ComponentFixture<Characters>;

  const characterServiceMock = {
    characters: signal([]),
  };

  const authServiceMock = {
    userSignal: signal(null),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Characters,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: Character,
          useValue: characterServiceMock,
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Characters);

    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});