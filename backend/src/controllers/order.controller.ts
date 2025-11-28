import { Request, Response, NextFunction } from 'express';
import { createOrder, getOrdersByUserId } from '../services/order.service.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// POST /api/orders
export async function createOrderHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const orderData = req.body;
    const order = await createOrder(orderData);
    sendSuccess(res, order, 'Order created successfully', 201);
  } catch (error) {
    next(error);
  }
}

// GET /api/orders/:userId
export async function getOrdersByUserIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.params;
    if (!userId) {
      sendError(res, 'User ID is required', 400);
      return;
    }

    const orders = await getOrdersByUserId(userId);
    sendSuccess(res, orders, 'Orders fetched successfully');
  } catch (error) {
    next(error);
  }
}
