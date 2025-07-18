// User interface
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

// Auth interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// District interface
export interface District {
  id: number;
  name: string;
}

// Restaurant interface
export interface Restaurant {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  districtName: string;
  pricePerPerson: number;
  capacity: number;
  // Additional properties for UI
  cuisine?: string;
  rating?: number;
  phone?: string;
  description?: string;
  imageUrl?: string;
}

// Pageable interface
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// Restaurant page response
export interface RestaurantPageResponse {
  content: Restaurant[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Reservation interfaces
export interface CreateReservationRequest {
  restaurantId: number;
  reservationDate: string;
  numberOfPeople: number;
  additionalInfo?: string;
}

export interface Reservation {
  id: number;
  restaurantName: string;
  reservationDate: string;
  numberOfPeople: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'PAID';
  additionalInfo?: string;
  totalAmount: number;
}

// Payment interfaces
export interface PaymentRequest {
  reservationId: number;
  returnUrl: string;
  cancelUrl: string;
}

export interface PaymentResponse {
  paypalUrl: string;
}

export interface PaymentCaptureResponse {
  completed: boolean;
  reservationId: number;
}

// PayPal Interfaces
export interface PaymentResponse {
  paypalUrl: string;
}

export interface PaymentCaptureResponse {
  completed: boolean;
  reservationId: number;
}

// Payment interfaces
export interface PaymentRequest {
  reservationId: number;
  returnUrl: string;
  cancelUrl: string;
}

export interface PaymentResponse {
  paypalUrl: string;
}

export interface PaymentCaptureResponse {
  completed: boolean;
  reservationId: number;
}
