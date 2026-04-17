import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth as AuthService } from '../../core/services/auth';
import { fadeInSlideUp } from '../../shared/animations/fade-in.animations'

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ FormsModule ],
  animations: [ fadeInSlideUp ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  authService = inject(AuthService);
  isLogin = signal(true);
  loading = signal(false);
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
      // Navegación exitosa manejada por el servicio o aquí
    } catch (error) {
      console.error("Fallo en la conexión con la Torre:", error);
    } finally {
      this.loading.set(false);
    }
  }
}
