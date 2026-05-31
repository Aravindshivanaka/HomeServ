-- Add review_count column to workers table if it does not exist
ALTER TABLE public.workers ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Update all workers: reset fake ratings and review_counts to 0
UPDATE public.workers
SET rating = 0, review_count = 0;
