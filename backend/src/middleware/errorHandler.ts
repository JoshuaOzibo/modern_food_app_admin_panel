import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';
import { ApiResponse } from '../utils/apiResponse.js';

export interface ErrorResponse extends ApiResponse {
  stack?: string;
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  // Log error for debugging
  console.error('Error:', err);

  // Handle known AppError instances
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      message: err.message,
      data: null,
      error: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };
    return res.status(err.statusCode).json(response);
  }

  // Handle Supabase errors
  if (err.message && err.message.includes('supabase')) {
    const response: ErrorResponse = {
      success: false,
      message: 'Database error occurred',
      data: null,
      error: 'An error occurred while accessing the database',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };
    return res.status(500).json(response);
  }

  // Handle validation errors from Supabase
  if (err.message && (err.message.includes('violates') || err.message.includes('constraint'))) {
    const response: ErrorResponse = {
      success: false,
      message: 'Validation error',
      data: null,
      error: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };
    return res.status(400).json(response);
  }

  // Handle unknown errors
  const response: ErrorResponse = {
    success: false,
    message: 'Internal server error',
    data: null,
    error: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  return res.status(500).json(response);
};
