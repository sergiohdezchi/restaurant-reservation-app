import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: 'restaurants',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/restaurants/restaurant-list/restaurant-list.component').then(m => m.RestaurantListComponent)
  },
  {
    path: 'restaurant/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/restaurants/restaurant-detail/restaurant-detail.component').then(m => m.RestaurantDetailComponent)
  },
  {
    path: 'reservations',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/reservations/reservation-list/reservation-list.component').then(m => m.ReservationListComponent)
  },
  {
    path: 'reservation/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/reservations/reservation-detail/reservation-detail.component').then(m => m.ReservationDetailComponent)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
