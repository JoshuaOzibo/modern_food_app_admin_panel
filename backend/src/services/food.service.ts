import supabase from '../config/supabase';
import { Food, CreateFoodRequest, UpdateFoodRequest, PaginationParams, PaginatedResponse } from '../types/index';
import { NotFoundError, ValidationError } from '../utils/errors';
import { randomUUID } from 'crypto';

// Helper function to convert string to array
function normalizeArray(value: string[] | string | undefined): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    // Handle comma-separated string
    return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
  }
  return undefined;
}

// Get all foods with pagination
export async function getAllFoods(params: PaginationParams = {}): Promise<PaginatedResponse<Food>> {
  const page = params.page || 1;
  const limit = params.limit || 20;
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from('foods')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(`Failed to fetch foods: ${error.message}`);
  }

  const totalPages = count ? Math.ceil(count / limit) : 0;

  return {
    data: data || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages,
    },
  };
}

// Get top-rated foods (rating >= 4.5)
export async function getTopRatedFoods(): Promise<Food[]> {
  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .gte('rating', 4.5)
    .order('rating', { ascending: false })
    .limit(20);

  if (error) {
    throw new Error(`Failed to fetch top-rated foods: ${error.message}`);
  }

  return data || [];
}

// Get popular foods (category = "popular" OR rating >= 4.0 with many reviews)
export async function getPopularFoods(): Promise<Food[]> {
  // First, try to get foods with category = "popular"
  const { data: popularCategoryData, error: categoryError } = await supabase
    .from('foods')
    .select('*')
    .eq('category', 'popular')
    .order('rating', { ascending: false })
    .limit(20);

  if (categoryError) {
    throw new Error(`Failed to fetch popular foods: ${categoryError.message}`);
  }

  // Also get foods with rating >= 4.0 and reviews
  const { data: highRatedData, error: ratingError } = await supabase
    .from('foods')
    .select('*')
    .gte('rating', 4.0)
    .not('reviews', 'is', null)
    .order('rating', { ascending: false })
    .limit(20);

  if (ratingError) {
    throw new Error(`Failed to fetch popular foods: ${ratingError.message}`);
  }

  // Combine and deduplicate by id
  const combined = [...(popularCategoryData || []), ...(highRatedData || [])];
  const uniqueFoods = Array.from(
    new Map(combined.map(food => [food.id, food])).values()
  );

  return uniqueFoods.slice(0, 20);
}

// Get food by ID
export async function getFoodById(id: string): Promise<Food> {
  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    throw new NotFoundError('Food');
  }

  return data;
}

// Create food
export async function createFood(foodData: CreateFoodRequest): Promise<Food> {
  // Validate required fields
  if (!foodData.name || !foodData.category || foodData.price === undefined) {
    throw new ValidationError('Name, category, and price are required');
  }

  // Validate price is a positive number
  if (foodData.price < 0) {
    throw new ValidationError('Price must be a positive number');
  }

  // Normalize arrays (handle comma-separated strings)
  const ingredients = normalizeArray(foodData.ingredients);
  const measures = normalizeArray(foodData.measures);

  // Auto-generate ID if not provided
  const id = randomUUID();

  const food: Food = {
    id,
    name: foodData.name,
    category: foodData.category,
    area: foodData.area,
    instructions: foodData.instructions,
    thumbnail: foodData.thumbnail,
    youtube: foodData.youtube,
    ingredients,
    measures,
    quantity: foodData.quantity,
    rating: foodData.rating,
    price: foodData.price, // Required field from CreateFoodRequest
    distance: foodData.distance,
    reviews: foodData.reviews,
  };

  const { data, error } = await supabase
    .from('foods')
    .insert(food)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create food: ${error.message}`);
  }

  return data;
}

// Update food
export async function updateFood(id: string, foodData: UpdateFoodRequest): Promise<Food> {
  // Check if food exists
  await getFoodById(id);

  // Validate price if provided
  if (foodData.price !== undefined && foodData.price < 0) {
    throw new ValidationError('Price must be a positive number');
  }

  // Normalize arrays if provided
  const updateData: Partial<Food> = { ...foodData } as Partial<Food>;
  if (foodData.ingredients !== undefined) {
    updateData.ingredients = normalizeArray(foodData.ingredients);
  }
  if (foodData.measures !== undefined) {
    updateData.measures = normalizeArray(foodData.measures);
  }

  const { data, error } = await supabase
    .from('foods')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update food: ${error.message}`);
  }

  return data;
}

// Delete food
export async function deleteFood(id: string): Promise<void> {
  // Check if food exists
  await getFoodById(id);

  const { error } = await supabase
    .from('foods')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete food: ${error.message}`);
  }
}
