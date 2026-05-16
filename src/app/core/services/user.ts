import { inject, Injectable } from '@angular/core';
import { ProfileUpdateData, User as IUser } from '../models/user.model';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import {
  Storage as FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class User {
  private firestore = inject(Firestore);
  private storage = inject(FirebaseStorage);

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

  async uploadProfilePicture(uid: string, file: File): Promise<string> {
    const filePath = `profile_pictures/${uid}`;
    const storageRef = ref(this.storage, filePath);

    try {
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading file to Storage:', error);
      throw error;
    }
  }
}
