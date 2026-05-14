//------ Imports ------//
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { LibraryId } from './library-id/library-id';
import { User as UserService } from '../../core/services/user';
import { AuthService } from '../../core/services/auth';
import { RouterLink } from '@angular/router';
import { Character as CharacterService } from '../../core/services/character';
import { User as IUser } from '../../core/models/user.model';
import { NgOptimizedImage } from '@angular/common';

//------ Component declaration ------//
@Component({
  selector: 'app-profile',
  imports: [LibraryId, RouterLink, NgOptimizedImage],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private characterService = inject(CharacterService);

  currentUser = signal<IUser | null>(null);
  isLoading = signal<boolean>(true); // Handles the "Cargando..." state cleanly

  // 🔥 Derived state: Angular will automatically update this when currentUser changes
  hasCompletedQuiz = computed(() => this.currentUser()?.hasCompletedQuiz ?? false);

  selectedCharacter = computed(() => {
    const user = this.currentUser();
    const characters = this.characterService.characters();

    if (!user?.assignedCharacterId || characters.length === 0) return null;

    return characters.find((c) => c.id === user.assignedCharacterId) || null;
  });

  async ngOnInit() {
    const user = this.authService.userSignal();

    if (!user) {
      this.isLoading.set(false);
      return;
    }

    try {
      // 🔥 Fetch only ONCE
      const profile = await this.userService.getProfile(user.uid);
      if (profile) {
        this.currentUser.set(profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
