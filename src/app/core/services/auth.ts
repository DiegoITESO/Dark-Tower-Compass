import { Injectable, inject, signal } from '@angular/core';
import { 
  Auth as FirebaseAuth, 
  user, 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
 } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private auth = inject(FirebaseAuth);
  private router = inject(Router);

  userSignal = signal<User | null | undefined>(undefined);

  constructor() {
    user(this.auth).subscribe((user) => {
      this.userSignal.set(user);
    });
  }

  async register(email: string, pass: string) {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
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
