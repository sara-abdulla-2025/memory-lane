CREATE TABLE IF NOT EXISTS memories (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  memory_date DATE,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO memories (title, description, image_url, memory_date)
VALUES
('Morning Tea', 'Sat on the porch sipping chamomile, sunlight on the table.', 'https://placehold.co/600x400?text=Tea', '2021-09-01'),
('Apple Picking', 'We laughed picking apples at the farm.', 'https://placehold.co/600x400?text=Apples', '2020-10-10')
ON CONFLICT DO NOTHING;
