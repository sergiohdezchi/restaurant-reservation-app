import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

interface PayPalCreateOrderResponse {
  paypalUrl: string;
}

interface PayPalCaptureResponse {
  completed: boolean;
  reservationId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  createPayPalOrder(reservationId: number, returnUrl: string, cancelUrl: string): Observable<PayPalCreateOrderResponse> {
    return this.http.post<PayPalCreateOrderResponse>(
      `${this.apiUrl}/checkout/paypal/create`,
      {},
      { 
        params: { reservationId: reservationId.toString(), returnUrl, cancelUrl },
        headers: this.authService.getAuthHeaders() 
      }
    );
  }

  capturePayPalOrder(orderId: string): Observable<PayPalCaptureResponse> {
    return this.http.post<PayPalCaptureResponse>(
      `${this.apiUrl}/checkout/paypal/capture`,
      {},
      { 
        params: { orderId },
        headers: this.authService.getAuthHeaders() 
      }
    );
  }
}
