import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MATERIAL_MODULES } from '../../../material.config';
import { ReservationService } from '../../../services/reservation.service';
import { Reservation } from '../../../models/interfaces';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ...MATERIAL_MODULES],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  selectedStatus: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  isLoading = false;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.isLoading = true;
    this.reservationService.getMyReservations().subscribe({
      next: (reservations: Reservation[]) => {
        this.reservations = reservations;
        this.filteredReservations = [...reservations];
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading reservations:', error);
        this.isLoading = false;
        // Mock data for development
        this.mockReservations();
      }
    });
  }

  private mockReservations() {
    this.reservations = [
      {
        id: 1,
        restaurantName: 'Restaurante El Buen Sabor',
        reservationDate: '2024-01-15',
        numberOfPeople: 4,
        status: 'PENDING',
        additionalInfo: 'Mesa junto a la ventana',
        totalAmount: 120.00
      },
      {
        id: 2,
        restaurantName: 'Café Central',
        reservationDate: '2024-01-20',
        numberOfPeople: 2,
        status: 'PENDING',
        additionalInfo: '',
        totalAmount: 85.50
      }
    ];
    this.filteredReservations = [...this.reservations];
  }

  filterReservations() {
    this.filteredReservations = this.reservations.filter(reservation => {
      const matchesStatus = !this.selectedStatus || reservation.status === this.selectedStatus;
      const matchesStartDate = !this.startDate || new Date(reservation.reservationDate) >= this.startDate;
      const matchesEndDate = !this.endDate || new Date(reservation.reservationDate) <= this.endDate;

      return matchesStatus && matchesStartDate && matchesEndDate;
    });
  }

  clearFilters() {
    this.selectedStatus = '';
    this.startDate = null;
    this.endDate = null;
    this.filteredReservations = [...this.reservations];
  }

  cancelReservation(reservationId: number) {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      // TODO: Implement cancelReservation in ReservationService
      alert('Funcionalidad de cancelación estará disponible próximamente');
      /*
      this.isLoading = true;
      this.reservationService.cancelReservation(reservationId).subscribe({
        next: () => {
          this.loadReservations();
        },
        error: (error: any) => {
          console.error('Error cancelling reservation:', error);
          this.isLoading = false;
        }
      });
      */
    }
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
}
