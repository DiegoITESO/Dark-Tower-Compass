//------ Imports ------//
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth as AuthService } from '../../core/services/auth';
import { fadeInSlideUp } from '../../shared/animations/fade-in.animations'

//------ Injectable decorator ------//
@Component({
  selector: 'app-auth', // HTML tag
  standalone: true,
  imports: [ FormsModule ], // so we can use ngModel for the email an password
  animations: [ fadeInSlideUp ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
//------ Service Auth ------//
export class Auth {
  authService = inject(AuthService);
  isLogin = signal(true); // to toggle between register and login forms
  loading = signal(false); // if its loading, we show a spinner
  email = '';
  password = '';

  toggleMode() {
    this.isLogin.update(v => !v);
  }

  async handleSubmit() {
    if (!this.email || !this.password) return;
    
    this.loading.set(true);
    try {
      if (this.isLogin()) {
        await this.authService.login(this.email, this.password);
      } else {
        await this.authService.register(this.email, this.password);
      }
    } catch (error) {
      console.error("Failed to connect to server:", error);
    } finally {
      this.loading.set(false);
    }
  }
}
