-- Delete test/fake workers
DELETE FROM workers 
WHERE name ILIKE ANY(ARRAY['qqq','xxxx','abc','qwerty','ard','devansh','test','dummy','sample']);

-- Reset the worker count on categories to match actual real workers remaining
UPDATE categories c
SET worker_count = (
  SELECT COUNT(*)
  FROM workers w
  WHERE w.category_id = c.id
);
