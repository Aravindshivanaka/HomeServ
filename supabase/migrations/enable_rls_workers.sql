-- Enable RLS on workers table
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;

-- Policy: public can read all columns EXCEPT phone
CREATE POLICY "Public read workers without phone" ON public.workers
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Revoke select on phone column from public anonymous reads to hide it
REVOKE SELECT (phone) ON public.workers FROM anon;
GRANT SELECT (id, name, slug, category_id, location, experience, rating, verified, description, image_url, services, featured, review_count) ON public.workers TO anon;

-- Policy: only authenticated users can read phone column IF they have a row in wishlist table with that worker_id
CREATE POLICY "Authenticated read phone if in wishlist" ON public.workers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.wishlist
      WHERE wishlist.worker_id = workers.id
    )
  );
