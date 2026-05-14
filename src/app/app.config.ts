//------ Imports ------//
import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

//------ Configuration for Firebase ------//
const firebaseConfig = {
  apiKey: 'AIzaSyA8FHpMHw0HWw5Gt4QmnVX1nWUaWtN0XNE',

  authDomain: 'dark-tower-compass.firebaseapp.com',

  projectId: 'dark-tower-compass',

  storageBucket: 'dark-tower-compass.firebasestorage.app',

  messagingSenderId: '527864079727',

  appId: '1:527864079727:web:afa6bb2a391e5af086349a',
};

//------ Configuration for App ------//
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
