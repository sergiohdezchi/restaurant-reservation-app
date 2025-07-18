import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_MODULES } from '../../../material.config';
import { RestaurantService } from '../../../services/restaurant.service';
import { ReservationService } from '../../../services/reservation.service';
import { Restaurant, CreateReservationRequest } from '../../../models/interfaces';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ...MATERIAL_MODULES],
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | null = null;
  reservationForm: FormGroup;
  isLoading = false;
  minDate = new Date();
  availableTimes = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      reservationDate: ['', Validators.required],
      time: ['', Validators.required],
      numberOfPeople: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      additionalInfo: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRestaurant(+id);
    }
  }

  loadRestaurant(id: number) {
    this.isLoading = true;
    this.restaurantService.getRestaurantById(id).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading restaurant:', error);
        this.isLoading = false;
        // Mock data for development
        this.mockRestaurant(id);
      }
    });
  }

  private mockRestaurant(id: number) {
    this.restaurant = {
      id: id,
      name: 'Restaurante El Buen Sabor',
      address: 'Calle Principal 123, Centro',
      phoneNumber: '+1 234 567 8900',
      districtName: 'Centro',
      pricePerPerson: 45,
      capacity: 80,
      // UI properties
      cuisine: 'Mediterránea',
      rating: 4.7,
      phone: '+1 234 567 8900',
      description: 'Un restaurante familiar con más de 20 años de experiencia ofreciendo los mejores sabores mediterráneos en un ambiente acogedor y elegante.',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
    };
  }

  onSubmitReservation() {
    if (this.reservationForm.valid && this.restaurant) {
      this.isLoading = true;

      const formValue = this.reservationForm.value;
      const reservationRequest: CreateReservationRequest = {
        restaurantId: this.restaurant.id,
        reservationDate: this.formatDate(formValue.reservationDate),
        numberOfPeople: formValue.numberOfPeople,
        additionalInfo: formValue.additionalInfo || undefined
      };

      this.reservationService.createReservation(reservationRequest).subscribe({
        next: (reservation) => {
          alert('¡Reserva creada exitosamente!');
          this.router.navigate(['/reservations']);
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
          alert('Error al crear la reserva. Por favor intenta nuevamente.');
          this.isLoading = false;
        }
      });
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const time = this.reservationForm.get('time')?.value || '12:00';
    return `${year}-${month}-${day}T${time}:00`;
  }

  calculateEstimatedTotal(): number {
    const numberOfPeople = this.reservationForm.get('numberOfPeople')?.value || 1;
    const averagePricePerPerson = 45; // Precio promedio por persona
    return numberOfPeople * averagePricePerPerson;
  }

  getReservationErrorMessage(field: string): string {
    const control = this.reservationForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('min')) {
      return 'Debe ser al menos 1 persona';
    }
    if (control?.hasError('max')) {
      return 'Máximo 10 personas';
    }
    return '';
  }
}
