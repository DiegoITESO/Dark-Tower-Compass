import { inject, Injectable } from '@angular/core';
import { User as IUser, ProfileUpdateData } from '../models/user.model';
import { doc, Firestore, updateDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class User {
  private firestore = inject(Firestore);

  async getProfile(uid: string): Promise<IUser | undefined> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return docSnap.data() as IUser;
    }
    return undefined;
  }

  async updateProfile(uid: string, data: ProfileUpdateData): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);

    try {
      await updateDoc(userDocRef, { ...data });
      console.log('Profile successfully updated in Derry Library Archives.');
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}
