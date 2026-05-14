import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { Quiz } from './quiz';

import { Character } from '../../core/services/character';
import { AuthService } from '../../core/services/auth';

import { Firestore } from '@angular/fire/firestore';
import * as firestoreFns from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

describe('Quiz Component', () => {
  let component: Quiz;
  let fixture: ComponentFixture<Quiz>;

  const mockCharacters = [
    {
      id: 'char-1',
      name: 'Roland',
      description: 'The Gunslinger',
      image: 'roland.jpg',
    },
    {
      id: 'char-2',
      name: 'Jake',
      description: 'The Boy',
      image: 'jake.jpg',
    },
  ];

  const authServiceMock = {
    userSignal: vi.fn(() => ({
      uid: 'user-123',
    })),
  };

  const characterServiceMock = {
    characters: signal(mockCharacters),
  };

  const firestoreMock = {};

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    vi.spyOn(firestoreFns, 'doc').mockReturnValue({} as any);

    vi.spyOn(firestoreFns, 'getDoc').mockResolvedValue({
      exists: () => false,
      data: () => ({}),
    } as any);

    vi.spyOn(firestoreFns, 'updateDoc').mockResolvedValue();

    await TestBed.configureTestingModule({
      imports: [Quiz],
      providers: [
        { provide: Character, useValue: characterServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Firestore, useValue: firestoreMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Quiz);
    component = fixture.componentInstance;

    await fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasCompletedQuiz inicia en false', () => {
    const freshComponent = TestBed.createComponent(Quiz).componentInstance;

    expect(freshComponent.hasCompletedQuiz).toBe(false);
  });

  it('isLoading debe existir', () => {
    expect(component.isLoading).toBeDefined();
  });

  it('goHome navega a home', () => {
    component.goHome();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('ngOnInit carga datos correctamente cuando el usuario ya completó quiz', async () => {
    vi.spyOn(firestoreFns, 'getDoc').mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        hasCompletedQuiz: true,
        assignedCharacterId: 'char-1',
        assignedCharacterName: 'Roland',
        assignedCharacterImage: 'roland.jpg',
        assignedCharacterDescription: 'The Gunslinger',
      }),
    } as any);

    await component.ngOnInit();

    expect(component.hasCompletedQuiz).toBe(true);
    expect(component.selectedCharacter.name).toBe('Roland');
  });

  it('onSubmit asigna personaje aleatorio', async () => {
    const mockForm = {} as NgForm;

    await component.onSubmit(mockForm);

    expect(component.selectedCharacter).not.toBeNull();
    expect(component.hasCompletedQuiz).toBe(true);
  });

  it('onSubmit llama updateDoc', async () => {
    const updateSpy = vi.spyOn(firestoreFns, 'updateDoc');

    const mockForm = {} as NgForm;

    await component.onSubmit(mockForm);

    expect(updateSpy).toHaveBeenCalled();
  });

  it('no permite submit si ya completó quiz', async () => {
    component.hasCompletedQuiz = true;

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await component.onSubmit({} as NgForm);

    expect(warnSpy).toHaveBeenCalled();
  });

  it('renderiza sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });
});
