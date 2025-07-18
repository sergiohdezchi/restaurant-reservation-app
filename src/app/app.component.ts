import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { User } from './models/interfaces';
import { MATERIAL_MODULES } from './material.config';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, ...MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FlavorHub - Reservas de Restaurantes';
  currentUser: User | null = null;
  isAuthRoute = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Detectar si estamos en rutas de autenticación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAuthRoute = event.url.includes('/auth');
    });
  }

  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToReservations(): void {
    this.router.navigate(['/reservations']);
  }

  navigateToRestaurants(): void {
    this.router.navigate(['/restaurants']);
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
