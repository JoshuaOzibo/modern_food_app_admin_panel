// Food interface matching database schema
export interface Food {
  id: string;
  name: string;
  category: string;
  price: number;
  thumbnail?: string;
}

// Order interface matching database schema
export interface Order {
  id?: string;
  user_id: string;
  food_id: string;
  quantity: number;
  total_price: number;
  status?: string;
  created_at?: string;
}

// Request types
export interface CreateFoodRequest {
  name: string;
  category: string;
  area?: string;
  instructions?: string;
  thumbnail?: string;
  youtube?: string;
  ingredients?: string[] | string;
  measures?: string[] | string;
  quantity?: number;
  rating?: number;
  price: number;
  distance?: string;
  reviews?: string;
}

export interface UpdateFoodRequest extends Partial<CreateFoodRequest> {}

export interface CreateOrderRequest {
  user_id: string;
  food_id: string;
  quantity: number;
  status?: string;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
