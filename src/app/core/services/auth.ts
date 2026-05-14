//------ Imports ------//
import { Injectable, inject, signal } from '@angular/core';
import {
  Auth as FirebaseAuth,
  user,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User as IUser } from '../models/user.model';
import { Storage as FirebaseStorage, ref, deleteObject, getStorage } from '@angular/fire/storage';

//------ Injectable decorator ------//
@Injectable({
  providedIn: 'root',
})
//------ Service Auth ------//
export class AuthService {
  private auth = inject(FirebaseAuth); // to manage login
  private router = inject(Router); // to redirect users when they log out
  private firestore = inject(Firestore); // to manage user data in Firestore
  private storage = inject(FirebaseStorage);
  userSignal = signal<User | null | undefined>(undefined);

  constructor() {
    user(this.auth).subscribe((user) => {
      // turn the observable into a signal
      this.userSignal.set(user);
    });
  }

  async register(email: string, pass: string) {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
      const user = credential.user;
      const userDocRef = doc(this.firestore, `users/${user.uid}`);

      const newUserProfile: IUser = {
        email: user.email,
        role: 'user',
        displayName: '',
        birthDate: '',
        favoriteBook: '',
        hasCompletedQuiz: false,
        assignedCharacterId: '',
      };
      await setDoc(userDocRef, newUserProfile);
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

  async deleteAccount() {
    const user = this.auth.currentUser;

    if (user) {
      try {
        // 1. Delete Storage Profile Picture (Safely)
        try {
          const storageRef = ref(this.storage, `profile_pictures/${user.uid}`);
          await deleteObject(storageRef);
        } catch (storageError: any) {
          // Ignore the error ONLY if the file simply doesn't exist
          if (storageError.code !== 'storage/object-not-found') {
            console.error('Failed to delete profile picture:', storageError);
            // Optionally throw here if you want to halt deletion on other storage errors
          }
        }
        // 2. Delete Firestore Document
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        await deleteDoc(userDocRef);
        // 3. Delete from Firebase Auth
        await deleteUser(user);

        // 4. Cleanup & Redirect
        this.router.navigate(['/login']);
      } catch (error: any) {
        if (error.code === 'auth/requires-recent-login') {
          alert('Please login again before deleting your account.');
          await this.logout();
        }
        throw error;
      }
    }
  }
}
