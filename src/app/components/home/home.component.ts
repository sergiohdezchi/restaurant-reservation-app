import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MATERIAL_MODULES } from '../../material.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ...MATERIAL_MODULES],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  features = [
    {
      icon: 'restaurant_menu',
      title: 'Variedad de Restaurantes',
      description: 'Descubre una amplia selección de restaurantes en diferentes distritos'
    },
    {
      icon: 'event_seat',
      title: 'Reservas Fáciles',
      description: 'Reserva tu mesa de forma rápida y sencilla en pocos clics'
    },
    {
      icon: 'payment',
      title: 'Pagos Seguros',
      description: 'Realiza tus pagos de forma segura con PayPal integrado'
    },
    {
      icon: 'star',
      title: 'Experiencia Premium',
      description: 'Disfruta de una experiencia gastronómica única y memorable'
    }
  ];

  stats = [
    { value: '500+', label: 'Restaurantes' },
    { value: '10K+', label: 'Reservas' },
    { value: '50+', label: 'Distritos' },
    { value: '99%', label: 'Satisfacción' }
  ];
}
