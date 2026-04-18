//------ Imports ------//
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { routes } from './app.routes';

//------ Configuration for Firebase ------//
const firebaseConfig = {
  apiKey: "AIzaSyB9s-WiC_8-6MwS0a3T_CqS_3fKeHAAR1c",
  authDomain: "prueba-dark-compass.firebaseapp.com",
  projectId: "prueba-dark-compass",
  storageBucket: "prueba-dark-compass.firebasestorage.app",
  messagingSenderId: "922892322920",
  appId: "1:922892322920:web:72cfca9cb1f79491cfd3dd",
  measurementId: "G-58P3QBP1JV"
};

//------ Configuration for App ------//
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideAnimationsAsync(),
  ],
};
