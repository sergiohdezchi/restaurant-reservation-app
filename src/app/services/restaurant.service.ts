import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  District,
  Restaurant,
  RestaurantPageResponse
} from '../models/interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseUrl = 'http://localhost:8080/api/v1'; // Cambia por tu URL de API

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getDistricts(): Observable<District[]> {
    return this.http.get<District[]>(`${this.baseUrl}/districts`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getRestaurants(page: number = 0, size: number = 5): Observable<RestaurantPageResponse> {
    return this.http.get<RestaurantPageResponse>(`${this.baseUrl}/restaurants/page?page=${page}&size=${size}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getRestaurantsByDistrict(districtName: string, page: number = 0, size: number = 5): Observable<RestaurantPageResponse> {
    return this.http.get<RestaurantPageResponse>(`${this.baseUrl}/restaurants/page/district?districtName=${districtName}&page=${page}&size=${size}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/restaurants/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
