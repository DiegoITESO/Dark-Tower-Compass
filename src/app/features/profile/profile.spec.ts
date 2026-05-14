import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { Profile } from './profile';
import { AuthService } from '../../core/services/auth';
import { User as UserService } from '../../core/services/user';
import { Character as CharacterService } from '../../core/services/character';

describe('Profile Component', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  const mockUser = {
    uid: '123',
  };

  const mockProfile = {
    id: '1',
    username: 'Fabricio',
    email: 'test@test.com',
    hasCompletedQuiz: true,
    assignedCharacterId: 'char-1',
  };

  const mockCharacters = [
    {
      id: 'char-1',
      name: 'Roland',
      description: 'Gunslinger',
    },
  ];

  const authServiceMock = {
    userSignal: vi.fn(() => mockUser),
  };

  const userServiceMock = {
    getProfile: vi.fn().mockResolvedValue(mockProfile),
  };

  const characterServiceMock = {
    characters: signal(mockCharacters),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: CharacterService, useValue: characterServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;

    await fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('currentUser inicia en null', () => {
    const freshComponent = TestBed.createComponent(Profile).componentInstance;
    expect(freshComponent.currentUser()).toBeNull();
  });

  it('isLoading debe existir', () => {
    expect(component.isLoading).toBeDefined();
    expect(typeof component.isLoading).toBe('function');
  });

  it('hasCompletedQuiz devuelve true correctamente', () => {
    component.currentUser.set(mockProfile as any);

    expect(component.hasCompletedQuiz()).toBe(true);
  });

  it('selectedCharacter devuelve el personaje asignado', () => {
    component.currentUser.set(mockProfile as any);

    expect(component.selectedCharacter()).toEqual(mockCharacters[0]);
  });

  it('selectedCharacter devuelve null si no hay personaje asignado', () => {
    component.currentUser.set({
      ...mockProfile,
      assignedCharacterId: '',
    } as any);

    expect(component.selectedCharacter()).toBeNull();
  });

  it('llama getProfile en ngOnInit', async () => {
    await component.ngOnInit();

    expect(userServiceMock.getProfile).toHaveBeenCalledWith('123');
  });

  it('renderiza sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });
});