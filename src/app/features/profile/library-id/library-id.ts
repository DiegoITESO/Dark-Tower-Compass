//------ Imports ------//
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { User as UserService } from '../../../core/services/user';
import { NgOptimizedImage } from '@angular/common';
//------ Component declaration ------//
@Component({
  selector: 'app-library-id',
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './library-id.html',
  styleUrl: './library-id.css',
})
export class LibraryId implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  formData = {
    name: '',
    dob: '',
    favoriteBook: '',
    photoUrl: 'assets/profile.jpg',
  };

  isUploading = false;

  async ngOnInit() {
    // Wait for the auth state to settle
    const user = this.authService.userSignal();

    if (user) {
      const profile = await this.userService.getProfile(user.uid);
      if (profile) {
        // Populate the form with real data. If it's empty in DB, keep it empty.
        this.formData.name = profile.displayName || '';
        this.formData.dob = profile.birthDate || '';
        this.formData.favoriteBook = profile.favoriteBook || '';
        this.formData.photoUrl = profile.photoUrl || 'assets/profile.jpg';
        this.cdr.detectChanges();
      }
    }
  }

  async saveProfile() {
    const currentUser = this.authService.userSignal();
    if (!currentUser) return;

    try {
      await this.userService.updateProfile(currentUser.uid, {
        displayName: this.formData.name,
        birthDate: this.formData.dob,
        favoriteBook: this.formData.favoriteBook,
      });
    } catch (error) {
      console.error('Failed to autosave.', error);
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const currentUser = this.authService.userSignal();

    if (!currentUser) return;

    this.isUploading = true;

    try {
      // 1. Upload the physical file to Firebase Storage
      const newPhotoUrl = await this.userService.uploadProfilePicture(currentUser.uid, file);

      // 2. Save that new URL to their Firestore document
      await this.userService.updateProfile(currentUser.uid, {
        photoUrl: newPhotoUrl,
      });

      // 3. Update the local variable so the UI changes instantly!
      this.formData.photoUrl = newPhotoUrl;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Failed to update profile picture.', error);
      alert('Could not upload image. Please try again.');
    } finally {
      this.isUploading = false;
      this.cdr.detectChanges();
    }
  }
}
