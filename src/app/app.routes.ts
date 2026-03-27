import { Routes } from '@angular/router';

export const routes: Routes = [
  // ==========================================
  // RUTAS PÚBLICAS (Accesibles para todos)
  // ==========================================
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'characters',
    loadComponent: () => import('./features/characters/characters.component').then(m => m.CharactersComponent)
  },
  {
    path: 'map',
    loadComponent: () => import('./features/map/map.component').then(m => m.MapComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('./features/events/events.component').then(m => m.EventsComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent)
  },

  // ==========================================
  // RUTAS PRIVADAS (Requieren inicio de sesión)
  // ==========================================
  {
    path: 'profile',
    loadComponent: () => import('./features/library-id/library-id.component').then(m => m.LibraryIdComponent),
  },
  {
    path: 'quiz',
    loadComponent: () => import('./features/quiz/quiz.component').then(m => m.QuizComponent),
  },

  // ==========================================
  // REDIRECCIONES POR DEFECTO
  // ==========================================
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'home' 
  }
];
