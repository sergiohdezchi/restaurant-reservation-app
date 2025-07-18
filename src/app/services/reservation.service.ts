import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateReservationRequest,
  Reservation,
  PaymentRequest,
  PaymentResponse,
  PaymentCaptureResponse
} from '../models/interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  createReservation(reservation: CreateReservationRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations`, reservation, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getMyReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservations/my-reservations`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getReservationById(id: number): Observable<Reservation> {
    // Intentar obtener del backend
    return new Observable<Reservation>(observer => {
      console.log(`Fetching reservation with ID ${id} from backend...`);
      
      // Para desarrollo, devolver directamente datos simulados
      // Comenta esta sección y descomenta la siguiente para conectar con el backend real
      const mockReservation = this.getMockReservationById(id);
      if (mockReservation) {
        console.log('Returning mock reservation:', mockReservation);
        setTimeout(() => {
          observer.next(mockReservation);
          observer.complete();
        }, 500); // Simular un pequeño retraso de red
      } else {
        console.error('Mock reservation not found for ID:', id);
        observer.error(new Error('Reservation not found'));
        observer.complete();
      }
      
      /* Descomenta esto para conectar con el backend real
      this.http.get<Reservation>(`${this.baseUrl}/reservations/${id}`, {
        headers: this.authService.getAuthHeaders()
      }).subscribe({
        next: (reservation) => {
          console.log('Received reservation from backend:', reservation);
          observer.next(reservation);
          observer.complete();
        },
        error: (error) => {
          console.error('Error getting reservation from backend:', error);
          // Si falla, devolver datos simulados para desarrollo
          const mockReservation = this.getMockReservationById(id);
          if (mockReservation) {
            console.log('Falling back to mock reservation:', mockReservation);
            observer.next(mockReservation);
          } else {
            console.error('No mock reservation available for ID:', id);
            observer.error(new Error('Reservation not found'));
          }
          observer.complete();
        }
      });
      */
    });
  }
  
  // Método de ayuda para obtener reservas simuladas por ID
  private getMockReservationById(id: number): Reservation | null {
    const mockReservations: Reservation[] = [
      {
        id: 1,
        restaurantName: 'Ate Sazón',
        reservationDate: '2025-08-08T20:00:00',
        numberOfPeople: 2,
        status: 'PENDING',
        additionalInfo: 'Celebración de aniversario',
        totalAmount: 90.00
      },
      {
        id: 2,
        restaurantName: 'Café Central',
        reservationDate: '2024-09-15T19:30:00',
        numberOfPeople: 4,
        status: 'PAID',
        additionalInfo: 'Mesa junto a la ventana',
        totalAmount: 120.00
      },
      {
        id: 3,
        restaurantName: 'Restaurante Miraflores',
        reservationDate: '2025-10-20T21:00:00',
        numberOfPeople: 6,
        status: 'CONFIRMED',
        additionalInfo: 'Cumpleaños',
        totalAmount: 180.50
      }
    ] as Reservation[];
    
    return mockReservations.find(reservation => reservation.id === id) || null;
  }

  createPaymentOrder(reservationId: number, returnUrl: string, cancelUrl: string): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.baseUrl}/checkout/paypal/create?reservationId=${reservationId}&returnUrl=${returnUrl}&cancelUrl=${cancelUrl}`, {}, {
      headers: this.authService.getAuthHeaders()
    });
  }

  capturePayment(orderId: string): Observable<PaymentCaptureResponse> {
    return this.http.post<PaymentCaptureResponse>(`${this.baseUrl}/checkout/paypal/capture?orderId=${orderId}`, {}, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
