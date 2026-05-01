//-------- Imports --------//
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { noAuthGuard } from './guards/no-auth-guard';

//-------- Route Definitions --------//
export const routes: Routes = [
  //-------- Public Routes --------//
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'characters',
    loadComponent: () => import('./features/characters/characters').then((m) => m.Characters),
  },
  {
    path: 'map',
    loadComponent: () => import('./features/map/map').then((m) => m.Map),
  },
  {
    path: 'events',
    loadComponent: () => import('./features/events/events').then((m) => m.Events),
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth').then((m) => m.Auth),
    canActivate: [noAuthGuard]
  },

  //-------- Private Routes --------//
  {
    path: 'profile',
    loadComponent: () => import('./features/library-id/library-id').then((m) => m.LibraryId),
    canActivate: [authGuard]
  },
  {
    path: 'quiz',
    loadComponent: () => import('./features/quiz/quiz').then((m) => m.Quiz),
    canActivate: [authGuard]
  },

  //-------- Default Redirects --------//
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
