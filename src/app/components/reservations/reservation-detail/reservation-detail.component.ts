import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '../../../material.config';

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_MODULES],
  template: `
    <div class="container">
      <div class="page-header">
        <h1>Detalle de Reserva</h1>
        <p>Información detallada de tu reserva</p>
      </div>
      
      <mat-card>
        <mat-card-content>
          <div class="coming-soon">
            <mat-icon>receipt</mat-icon>
            <h3>En Desarrollo</h3>
            <p>Los detalles de la reserva y funcionalidad de pago estarán disponibles pronto.</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .page-header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .coming-soon {
      text-align: center;
      padding: 60px 20px;
      
      mat-icon {
        font-size: 4rem;
        width: 4rem;
        height: 4rem;
        color: #45b7d1;
        margin-bottom: 20px;
      }
      
      h3 {
        color: #2c3e50;
        margin-bottom: 10px;
      }
      
      p {
        color: #333;
        opacity: 0.8;
      }
    }
  `]
})
export class ReservationDetailComponent {}
