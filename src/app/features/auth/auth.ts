//------ Imports ------//
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth as AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

//------ Injectable decorator ------//
@Component({
  selector: 'app-auth', // HTML tag
  standalone: true,
  imports: [FormsModule], // so we can use ngModel for the email an password
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
//------ Service Auth ------//
export class Auth {
  authService = inject(AuthService);
  router = inject(Router);
  isLogin = signal(true); // to toggle between register and login forms
  loading = signal(false); // if its loading, we show a spinner
  errorMessage = signal<string>('');
  email = '';
  password = '';
  confirmPassword = '';

  toggleMode() {
    this.isLogin.update((v) => !v);
    this.errorMessage.set('');
    this.confirmPassword = '';
  }

  async handleSubmit() {
    if (!this.email || !this.password) return;

    if (!this.isLogin() && this.password !== this.confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      if (this.isLogin()) {
        await this.authService.login(this.email, this.password);
      } else {
        await this.authService.register(this.email, this.password);
      }

      await this.router.navigate(['/home']);
    } catch (error: unknown) {
      console.error('ERROR DE AUTENTICACION');
      console.error('Objeto de error crudo:', error);

      if (typeof error === 'object' && error !== null && 'code' in error) {
        const fbError = error as { code: string; message: string };
        console.error('Código de Firebase extraído:', fbError.code);

        switch (fbError.code) {
          case 'auth/invalid-email':
            this.errorMessage.set('Email inválido.');
            break;
          case 'auth/invalid-credential':
            this.errorMessage.set('Usuario o contraseña incorrectos.');
            break;
          case 'auth/user-not-found':
            this.errorMessage.set('Usuario o contraseña incorrectos.');
            break;
          case 'auth/wrong-password':
            this.errorMessage.set('Usuario o contraseña incorrectos.');
            break;
          case 'auth/email-already-in-use':
            this.errorMessage.set('Este correo ya está registrado.');
            break;
          case 'auth/network-request-failed':
            this.errorMessage.set('No se pudo conectar al servidor. Verifique su red.');
            break;
          case 'auth/too-many-requests':
            this.errorMessage.set('Demasiados intentos fallidos. Intente más tarde.');
            break;
          default:
            this.errorMessage.set(`Error inesperado de firebase: ${fbError.code}`);
        }
      } else if (error instanceof Error) {
        console.error('Error nativo de JS detectado:', error.message);
        this.errorMessage.set(`Error interno: ${error.message}`);
      } else {
        console.error('Tipo de error desconocido:', typeof error);
        this.errorMessage.set('Ocurrió un error crítico y desconocido.');
      }
      setTimeout(() => {
        this.errorMessage.set('');
      }, 4000);
    } finally {
      this.loading.set(false);
    }
  }
}
