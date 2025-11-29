import { Router } from 'express';
import {
  createOrderHandler,
  getOrdersByUserIdHandler,
} from '../controllers/order.controller';

const router = Router();

// POST /api/orders
router.post('/', createOrderHandler);

// GET /api/orders/:userId
router.get('/:userId', getOrdersByUserIdHandler);

export default router;
