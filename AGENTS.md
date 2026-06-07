# ServeHome — Agent Rules

## Project Overview
ServeHome is a mobile-first Next.js + Supabase website.
Users find local service workers in Jagtial, India.
Users pay Rs.10 to unlock worker contact numbers per category.
Live site: https://home-serv-pi.vercel.app
GitHub: https://github.com/Aravindshivanaka/HomeServ

---

## CRITICAL DATA RULES — NEVER BREAK THESE

- ALL data comes from Supabase ONLY
- src/data/workers/ folder is DELETED — do not reference it ever
- Never add hardcoded worker arrays anywhere in the project
- Never add mock/dummy/fallback worker data to any function
- On ANY Supabase error always return empty array []
- Never return mock data as fallback under any circumstances
- fetchWorkersByCategory() must only return real Supabase data
- fetchPopularWorkers() must only return real Supabase data

---

## CRITICAL CODE RULES — NEVER BREAK THESE

- Never rewrite entire files — only change what is specifically asked
- Never change files that are not mentioned in the task
- Never add new npm packages without asking owner first
- After every single change — verify no mock data was accidentally added
- Do not create implementation plans — write code immediately
- Do not ask for approval between steps — complete the task fully

---

## PERFORMANCE RULES — MOBILE 2G/3G USERS

- All users are on basic Android phones with slow SIM data in India
- Every page must load under 3 seconds on 3G
- No heavy npm packages — vanilla JS preferred
- Use server components wherever possible
- Images must be WebP format — lazy loaded
- No jQuery, no lodash, no heavy utility libraries

---

## AUTH SYSTEM — DO NOT CHANGE

- Auth uses localStorage only
- Keys: is_logged_in, user_phone, user_name, redirect_after_login
- Test OTP is always 123456 — this is intentional for development
- Real Twilio OTP will replace this later — do not build it now
- Never replace the auth system unless specifically instructed

---

## SUPABASE TABLES

workers:
  id, name, slug, phone, category_id, location, experience,
  rating, verified, is_approved, featured, is_free_visible,
  description, image_url, services, updated_at, created_at

categories:
  id, name, slug, icon, created_at

wishlist:
  id, user_phone, worker_id, worker_name, worker_slug,
  worker_category, worker_location, worker_image_url, created_at

users:
  id, phone, display_name, created_at

payments:
  NOT BUILT YET — do not reference this table

---

## FILE STRUCTURE — IMPORTANT FILES

src/lib/supabase.ts        — Supabase client
src/lib/workers.ts         — All worker fetch functions
src/lib/auth.ts            — Auth localStorage helpers
src/lib/wishlist.ts        — Wishlist Supabase functions
src/lib/users.ts           — User name functions
src/app/page.tsx           — Home page
src/app/categories/        — All categories page
src/app/category/[slug]/   — Worker list per category
src/app/worker/[slug]/     — Worker profile page
src/app/unlock/[category]/ — Payment unlock page
src/app/login/             — Phone OTP login
src/app/profile/           — User profile
src/app/unlocks/           — Wishlist page
src/app/admin/             — Admin panel
src/components/PopularWorkersSection.tsx — Popular Near You

---

## WHAT IS PENDING TO BUILD

1. CRITICAL: Connect Razorpay Rs.10 payment on unlock page
2. CRITICAL: After payment unlock numbers for 3 days
3. CRITICAL: Delete qqq and xxxx workers from Supabase
4. CRITICAL: Remove src/data/workers/ mock data completely
5. Replace fake reviews with real review system
6. Add dark/light mode toggle
7. Real Twilio SMS OTP — last thing before launch

---

## TESTING CHECKLIST — RUN AFTER EVERY CHANGE

Check these URLs after every deployment:
- /category/plumber — must show real workers not qqq/xxxx
- /category/ac-repair — must show 6 real workers
- /profile — must not be blank
- /unlocks — must show empty state or real wishlist

Write the complete updated AGENTS.md file NOW with exactly this content.
Do not add anything extra. Do not keep any old content.
