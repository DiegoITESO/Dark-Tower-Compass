//------ Imports ------//
import { Component, inject, OnInit, signal } from '@angular/core';
import { LibraryId } from './library-id/library-id';
import { User as UserService } from '../../core/services/user';
import { AuthService } from '../../core/services/auth';

//------ Component declaration ------//
@Component({
  selector: 'app-profile',
  imports: [LibraryId],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  hasCompletedQuiz = signal<boolean | null>(null);
  async ngOnInit() {
    const user = this.authService.userSignal();

    if (user) {
      try {
        const profile = await this.userService.getProfile(user.uid);
        if (profile) {
          this.hasCompletedQuiz.set(profile.hasCompletedQuiz ?? false);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        this.hasCompletedQuiz.set(false); // Default fallback
      }
    }
  }
}
