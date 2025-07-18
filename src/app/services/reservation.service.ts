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
  private baseUrl = 'http://localhost:8080/api/v1'; // Cambia por tu URL de API

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
    return this.http.get<Reservation>(`${this.baseUrl}/reservations/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
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
