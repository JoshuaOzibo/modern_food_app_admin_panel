import express from 'express';
import cors from 'cors';
import foodRoutes from './routes/food.routes.js';
import orderRoutes from './routes/order.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running...' });
});

// API Routes
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
