-- Create foods table
CREATE TABLE IF NOT EXISTS foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  area TEXT,
  instructions TEXT,
  thumbnail TEXT,
  youtube TEXT,
  ingredients TEXT[],
  measures TEXT[],
  quantity INTEGER,
  rating FLOAT8,
  price FLOAT8,
  distance TEXT,
  reviews TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_foods_category ON foods(category);

-- Create index on rating for top-rated queries
CREATE INDEX IF NOT EXISTS idx_foods_rating ON foods(rating) WHERE rating IS NOT NULL;

-- Create index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_foods_created_at ON foods(created_at DESC);
