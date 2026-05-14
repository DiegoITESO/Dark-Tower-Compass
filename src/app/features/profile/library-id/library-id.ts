//------ Imports ------//
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { User as UserService } from '../../../core/services/user';
//------ Component declaration ------//
@Component({
  selector: 'app-library-id',
  imports: [FormsModule],
  templateUrl: './library-id.html',
  styleUrl: './library-id.css',
})
export class LibraryId implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  formData = {
    name: '',
    dob: '',
    favoriteBook: '',
  };

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
}
