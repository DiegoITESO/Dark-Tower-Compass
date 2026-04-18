//------ Imports ------//
import { Injectable, inject, signal } from '@angular/core';
import { 
  Auth as FirebaseAuth, 
  user, 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
 } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

//------ Injectable decorator ------//
@Injectable({
  providedIn: 'root',
})
//------ Service Auth ------//
export class Auth {
  private auth = inject(FirebaseAuth); // to manage login
  private router = inject(Router);     // to redirect users when they log out
  private firestore = inject(Firestore); // to manage user data in Firestore

  userSignal = signal<User | null | undefined>(undefined);

  constructor() {
    user(this.auth).subscribe((user) => { // turn the observable into a signal
      this.userSignal.set(user);
    });
  }

  async register(email: string, pass: string) {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
      const user = credential.user;

      const userDocRef = doc(this.firestore, `users/${user.uid}`);

      await setDoc(userDocRef, {
        assignedCharacterId: "",
        birthDate: "",
        displayName: "", 
        favoriteBook: "",
        hasCompletedQuiz: false,
        email: user.email,
        role: 'user'
      });
      return credential;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, pass: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, pass);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
