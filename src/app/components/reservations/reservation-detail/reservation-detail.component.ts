import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_MODULES } from '../../../material.config';
import { ReservationService } from '../../../services/reservation.service';
import { PaymentService } from '../../../services/payment.service';
import { Reservation } from '../../../models/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ...MATERIAL_MODULES],
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {
  reservation: Reservation | null = null;
  isLoading = false;
  loadingPayment = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) {
    console.log('ReservationDetailComponent constructor called');
  }

  ngOnInit(): void {
    console.log('ReservationDetailComponent initialized');
    console.log('Route:', this.route.snapshot);
    this.loadReservation();

    // Verificar si hay un parámetro de orderId en la URL (regreso de PayPal)
    this.route.queryParams.subscribe(params => {
      console.log('Query params:', params);
      const orderId = params['orderId'];
      if (orderId) {
        this.capturePayment(orderId);
      }
    });
  }

  loadReservation(): void {
    this.isLoading = true;
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID param from route:', idParam);
    const id = Number(idParam);

    console.log('Loading reservation with ID:', id);

    if (isNaN(id)) {
      this.error = 'ID de reserva inválido';
      this.isLoading = false;
      console.error('Invalid reservation ID');
      return;
    }

    // Crear datos de reserva de prueba para depuración
    setTimeout(() => {
      console.log('Creating mock reservation data for debugging');
      this.reservation = {
        id: id,
        restaurantName: 'Restaurante de Prueba',
        reservationDate: new Date().toISOString(),
        numberOfPeople: 2,
        status: 'PENDING',
        additionalInfo: 'Información adicional de prueba',
        totalAmount: 90.00
      };
      this.isLoading = false;
      console.log('Debug reservation set:', this.reservation);
    }, 1000);

    /* Comentado temporalmente para depuración
    this.reservationService.getReservationById(id).pipe(
      catchError(error => {
        console.error('Error loading reservation:', error);
        this.error = 'No se pudo cargar la información de la reserva';
        return of(null);
      })
    ).subscribe({
      next: reservation => {
        console.log('Reservation loaded:', reservation);
        if (!reservation) {
          console.error('Reservation is null or undefined');
          this.error = 'No se pudo encontrar la reserva solicitada';
        } else {
          this.reservation = reservation;
        }
        this.isLoading = false;
      },
      error: err => {
        console.error('Unexpected error in subscription:', err);
        this.error = 'Error inesperado al cargar los datos';
        this.isLoading = false;
      }
    });
    */
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'CONFIRMED': return 'check_circle';
      case 'PENDING': return 'schedule';
      case 'COMPLETED': return 'done_all';
      case 'CANCELLED': return 'cancel';
      case 'PAID': return 'payment';
      default: return 'help';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'CONFIRMED': return 'Confirmada';
      case 'PENDING': return 'Pendiente';
      case 'COMPLETED': return 'Completada';
      case 'CANCELLED': return 'Cancelada';
      case 'PAID': return 'Pagada';
      default: return 'Desconocido';
    }
  }

  initiatePayment(): void {
    if (!this.reservation) return;

    this.loadingPayment = true;
    const baseUrl = window.location.origin;
    const returnUrl = `${baseUrl}/reservation/${this.reservation.id}/payment-success`;
    const cancelUrl = `${baseUrl}/reservation/${this.reservation.id}`;

    this.paymentService.createPayPalOrder(this.reservation.id, returnUrl, cancelUrl).pipe(
      catchError(error => {
        console.error('Error initiating payment:', error);
        this.snackBar.open('No se pudo iniciar el pago. Intenta nuevamente más tarde.', 'Cerrar', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
        this.loadingPayment = false;
        return of(null);
      })
    ).subscribe(response => {
      this.loadingPayment = false;
      if (response && response.paypalUrl) {
        window.location.href = response.paypalUrl;
      }
    });
  }

  capturePayment(orderId: string): void {
    this.loadingPayment = true;
    this.paymentService.capturePayPalOrder(orderId).pipe(
      catchError(error => {
        console.error('Error capturing payment:', error);
        this.snackBar.open('Error al procesar el pago. Contacta al soporte.', 'Cerrar', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
        this.loadingPayment = false;
        return of(null);
      })
    ).subscribe(response => {
      this.loadingPayment = false;
      if (response && response.completed) {
        this.snackBar.open('¡Pago completado con éxito!', 'Cerrar', {
          duration: 3000,
          panelClass: 'success-snackbar'
        });
        // Recargar la reserva para obtener el estado actualizado
        this.loadReservation();
      }
    });
  }
}
