import supabase from '../config/supabase';
import { Order, CreateOrderRequest } from '../types/index';
import { NotFoundError, ValidationError } from '../utils/errors';
import { getFoodById } from './food.service';
import { randomUUID } from 'crypto';

// Create order
export async function createOrder(orderData: CreateOrderRequest): Promise<Order> {
  // Validate required fields
  if (!orderData.user_id || !orderData.food_id || !orderData.quantity) {
    throw new ValidationError('User ID, food ID, and quantity are required');
  }

  // Validate quantity is positive
  if (orderData.quantity <= 0) {
    throw new ValidationError('Quantity must be a positive number');
  }

  // Validate food exists and get its price
  const food = await getFoodById(orderData.food_id);

  if (!food.price) {
    throw new ValidationError('Food item does not have a valid price');
  }

  // Calculate total price
  const totalPrice = food.price * orderData.quantity;

  // Set default status if not provided
  const status = orderData.status || 'pending';

  // Create order
  const order: Order = {
    id: randomUUID(),
    user_id: orderData.user_id,
    food_id: orderData.food_id,
    quantity: orderData.quantity,
    total_price: totalPrice,
    status,
  };

  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }

  return data;
}

// Get orders by user ID (newest first)
export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  if (!userId) {
    throw new ValidationError('User ID is required');
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return data || [];
}
