//------ Imports ------//
import { Component, inject } from '@angular/core';
import { Auth as AuthService } from '../../../core/services/auth';
import { RouterLink } from '@angular/router';

//------ Component declaration ------//
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected authService = inject(AuthService);
}
