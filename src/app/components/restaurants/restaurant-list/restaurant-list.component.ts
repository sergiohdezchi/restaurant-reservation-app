import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestaurantService } from '../../../services/restaurant.service';
import { Restaurant, District, RestaurantPageResponse } from '../../../models/interfaces';
import { MATERIAL_MODULES } from '../../../material.config';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ...MATERIAL_MODULES],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.scss'
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  districts: District[] = [];
  selectedDistrict: string = '';
  currentPage = 0;
  pageSize = 6;
  totalPages = 0;
  totalElements = 0;
  isLoading = false;
  isLoadingDistricts = false;

  constructor(
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDistricts();
    this.loadRestaurants();
  }

  loadDistricts(): void {
    this.isLoadingDistricts = true;
    this.restaurantService.getDistricts().subscribe({
      next: (districts) => {
        this.districts = districts;
        this.isLoadingDistricts = false;
      },
      error: (error) => {
        console.error('Error loading districts:', error);
        this.isLoadingDistricts = false;
        this.snackBar.open('Error al cargar los distritos', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  loadRestaurants(): void {
    this.isLoading = true;
    
    const loadFunction = this.selectedDistrict ? 
      this.restaurantService.getRestaurantsByDistrict(this.selectedDistrict, this.currentPage, this.pageSize) :
      this.restaurantService.getRestaurants(this.currentPage, this.pageSize);
    
    loadFunction.subscribe({
      next: (response: RestaurantPageResponse) => {
        this.restaurants = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading restaurants:', error);
        this.isLoading = false;
        this.snackBar.open('Error al cargar los restaurantes', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onDistrictChange(): void {
    this.currentPage = 0;
    this.loadRestaurants();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadRestaurants();
  }

  clearFilter(): void {
    this.selectedDistrict = '';
    this.currentPage = 0;
    this.loadRestaurants();
  }

  getPageArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i);
  }
}
