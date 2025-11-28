-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  food_id UUID NOT NULL,
  quantity INTEGER NOT NULL,
  total_price FLOAT8 NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fk_food FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);

-- Create index on user_id for faster user order queries
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Create index on created_at for ordering by newest first
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Create index on food_id for food-related queries
CREATE INDEX IF NOT EXISTS idx_orders_food_id ON orders(food_id);
