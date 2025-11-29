import { Request, Response, NextFunction } from 'express';
import {
  getAllFoods,
  getTopRatedFoods,
  getPopularFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from '../services/food.service';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { uploadImageToCloudinary } from '../utils/cloudinary';
import { ValidationError } from '../utils/errors';

// GET /api/foods
export async function getAllFoodsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

    const result = await getAllFoods({ page, limit });
    sendSuccess(res, result, 'Foods fetched successfully');
  } catch (error) {
    next(error);
  }
}

// GET /api/foods/top-rated
export async function getTopRatedFoodsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const foods = await getTopRatedFoods();
    sendSuccess(res, foods, 'Top-rated foods fetched successfully');
  } catch (error) {
    next(error);
  }
}

// GET /api/foods/popular
export async function getPopularFoodsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const foods = await getPopularFoods();
    sendSuccess(res, foods, 'Popular foods fetched successfully');
  } catch (error) {
    next(error);
  }
}

// GET /api/foods/:id
export async function getFoodByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    if (!id) {
      sendError(res, 'Food ID is required', 400);
      return;
    }

    const food = await getFoodById(id);
    sendSuccess(res, food, 'Food fetched successfully');
  } catch (error) {
    next(error);
  }
}

// POST /api/foods
export async function createFoodHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const foodData = req.body;
    
    // Handle image upload if provided
    if (req.file) {
      try {
        const uploadResult = await uploadImageToCloudinary(
          req.file.buffer,
          'foods'
        );
        // Set thumbnail to the Cloudinary URL
        foodData.thumbnail = uploadResult.secure_url;
      } catch (uploadError) {
        throw new ValidationError(
          `Image upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`
        );
      }
    }
    // If thumbnail is provided as a URL string (for direct URL submission), use it
    // Otherwise, if no file and no thumbnail URL, thumbnail will be undefined
    
    const food = await createFood(foodData);
    sendSuccess(res, food, 'Food created successfully', 201);
  } catch (error) {
    next(error);
  }
}

// PUT /api/foods/:id
export async function updateFoodHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    if (!id) {
      sendError(res, 'Food ID is required', 400);
      return;
    }

    const foodData = req.body;

    // Handle image upload if provided
    if (req.file) {
      try {
        const uploadResult = await uploadImageToCloudinary(
          req.file.buffer,
          'foods'
        );
        // Set thumbnail to the Cloudinary URL
        foodData.thumbnail = uploadResult.secure_url;
      } catch (uploadError) {
        throw new ValidationError(
          `Image upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`
        );
      }
    }

    const food = await updateFood(id, foodData);
    sendSuccess(res, food, 'Food updated successfully');
  } catch (error) {
    next(error);
  }
}

// DELETE /api/foods/:id
export async function deleteFoodHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    if (!id) {
      sendError(res, 'Food ID is required', 400);
      return;
    }

    await deleteFood(id);
    sendSuccess(res, null, 'Food deleted successfully');
  } catch (error) {
    next(error);
  }
}
