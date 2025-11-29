import { Router } from 'express';
import {
  getAllFoodsHandler,
  getTopRatedFoodsHandler,
  getPopularFoodsHandler,
  getFoodByIdHandler,
  createFoodHandler,
  updateFoodHandler,
  deleteFoodHandler,
} from '../controllers/food.controller';
import { uploadSingle } from '../middleware/upload';

const router = Router();

// GET /api/foods
router.get('/', getAllFoodsHandler);

// GET /api/foods/top-rated
router.get('/top-rated', getTopRatedFoodsHandler);

// GET /api/foods/popular
router.get('/popular', getPopularFoodsHandler);

// GET /api/foods/:id
router.get('/:id', getFoodByIdHandler);

// POST /api/foods (with image upload middleware)
router.post('/', uploadSingle, createFoodHandler);

// PUT /api/foods/:id (with image upload middleware)
router.put('/:id', uploadSingle, updateFoodHandler);

// DELETE /api/foods/:id
router.delete('/:id', deleteFoodHandler);

export default router;
