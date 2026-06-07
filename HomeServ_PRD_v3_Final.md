
SERVEHOME
Product Requirements Document — v3.0 FINAL
Find Any Worker Near You — Instantly

Field	Details
Version	3.0 — Updated after development
Date	June 2026
Live URL	https://home-serv-pi.vercel.app
GitHub	https://github.com/Aravindshivanaka/HomeServ
Platform	Mobile-First Website (Next.js)
Target City	Jagtial, Telangana
Database	Supabase PostgreSQL
Hosting	Vercel (Free)
Total Tool Cost	Rs. 0/month — 100% Free Stack

 
SECTION 1 — What is ServeHome?

1.1  Overview
ServeHome is a mobile-first website connecting homeowners with trusted local service workers in Jagtial. Users browse by category, view worker profiles, and pay Rs. 10 to unlock contact numbers for an entire category for 3 days.

1.2  Problem Solved
•	Finding reliable plumbers, electricians, carpenters in India is extremely painful
•	No single trusted platform for blue-collar worker contact details
•	Workers miss work because customers cannot reach them

1.3  Business Model
Revenue	How	Amount
Category Unlock	User pays Rs.10 to see all numbers in one category	Rs. 10 per unlock
Free Visible Spots	Workers pay owner a fee to appear as one of the 2 free contacts	Decided by owner
Future Franchise	Sell rights to run ServeHome in another city	Monthly fee + commission

1.4  Current Launch Status
•	City: Jagtial, Telangana only
•	54 real workers added — 6 per category
•	9 categories active
•	Website live at home-serv-pi.vercel.app
 
SECTION 2 — Technology Stack (100% Free)

Part	Tool	Cost
Frontend	Next.js 14 + TypeScript	Free
Styling	Tailwind CSS	Free
Database	Supabase PostgreSQL	Free tier
Auth	Supabase Auth + localStorage test mode	Free
Payments	Razorpay (UI built, integration pending)	Free setup
Hosting	Vercel	Free
Icons	Lucide React	Free
Fonts	Google Fonts — Poppins	Free

⚠️  All tools are free. Razorpay charges ~2% only when a payment is made. No monthly costs.
 
SECTION 3 — Design Guidelines

3.1  Design Feel
Light mode default. Premium, clean, trustworthy. Soft shadows, rounded cards, Poppins font.

3.2  Light Mode Colours
Name	Hex	Use
Primary Blue	#2563EB	Logo, buttons, nav active, headings
Light Blue BG	#EFF6FF	Page background, card backgrounds
Orange Action	#F97316	Pay button, Call button, CTAs
Success Green	#22C55E	Verified badge, unlock success
Dark Text	#1E293B	Worker names, headings
Grey Text	#6B7280	Subtext, area names
White	#FFFFFF	Cards, inputs, modals
Border	#DBEAFE	Card borders, dividers
Star Yellow	#F59E0B	Star ratings
Purple Location	#7C3AED	Location badge text
Purple Light BG	#F3E8FF	Location badge background

3.3  Dark Mode Colours
Name	Hex	Use
Background	#0F172A	Page background
Card BG	#1E293B	Worker cards, category cards
Border	#2563EB	Card borders — blue glow
Primary Blue	#3B82F6	Buttons, active states
Orange	#FB923C	Pay button in dark mode
White Text	#F1F5F9	All main text
Grey Text	#94A3B8	Subtext in dark mode

3.4  Typography
Element	Font	Size	Weight
Logo	Poppins	22px	700
Page Heading	Poppins	20px	600
Worker Name	Poppins	15px	600
Body Text	Poppins	14px	400
Button	Poppins	14px	600
Small Label	Poppins	12px	500
 
SECTION 4 — Database Structure (Supabase)

⚠️  IMPORTANT: All data must come from Supabase ONLY. No mock/hardcoded data anywhere in code.

Table 1: workers
Column	Type	Notes
id	UUID	Auto generated primary key
name	TEXT	Worker full name
slug	TEXT	URL-friendly unique ID — used for /worker/[slug] routing
phone	TEXT	Worker mobile — +91XXXXXXXXXX format
category_id	UUID	Foreign key → categories.id
location	TEXT	Area in Jagtial — example: Jagtial - Tower Circle
experience	TEXT	Example: 5 Years
rating	DECIMAL	0 to 5 — calculated from reviews
verified	BOOLEAN	true = shows Verified badge
is_approved	BOOLEAN	true = visible on website
featured	BOOLEAN	true = appears in Popular Near You section
is_free_visible	BOOLEAN	true = shown as free contact without payment
description	TEXT	About the worker — shown on profile page
image_url	TEXT	Profile photo URL from Supabase Storage
services	TEXT[]	Array of services — example: {Pipe Repair, Tap Installation}
updated_at	TIMESTAMP	Auto-updated on every edit — used for Popular Near You ordering
created_at	TIMESTAMP	When worker was added

Table 2: categories
Column	Type	Notes
id	UUID	Primary key
name	TEXT	Display name — example: AC Repair
slug	TEXT	URL slug — example: ac-repair
icon	TEXT	Icon name or SVG path
created_at	TIMESTAMP	Auto

Table 3: wishlist
Column	Type	Notes
id	UUID	Primary key
user_phone	TEXT	User's phone number — links to users table
worker_id	TEXT	Worker ID being saved
worker_name	TEXT	Cached worker name
worker_slug	TEXT	Cached slug for routing
worker_category	TEXT	Cached category name
worker_location	TEXT	Cached location
worker_image_url	TEXT	Cached image URL
created_at	TIMESTAMP	When saved

Table 4: users
Column	Type	Notes
id	UUID	Primary key
phone	TEXT	Unique — user mobile number
display_name	TEXT	Name user sets on first login
created_at	TIMESTAMP	Auto

Table 5: payments (to be built)
Column	Type	Notes
id	UUID	Primary key
user_phone	TEXT	Who paid
category	TEXT	Which category unlocked
amount	INTEGER	Always 10
razorpay_order_id	TEXT	From Razorpay
razorpay_payment_id	TEXT	From Razorpay
razorpay_signature	TEXT	Verified on backend
paid_at	TIMESTAMP	Payment time
expires_at	TIMESTAMP	paid_at + 3 days
 
SECTION 5 — All Pages Detailed

PAGE 1 — Home Page  /
Features built:
•	Top bar: ServeHome logo + user greeting with name from localStorage
•	Location badge top right: purple pill showing 📍 Jagtial
•	Search bar: filters categories and workers
•	Promotional banner: 'Find expert help for your home'
•	Categories grid: 3 columns, first 5 shown then More expands all 9
•	Popular Near You: horizontal scroll rows of 3, left/right arrows, fade gradient
•	Bottom navigation: Home, Categories, Wishlist, Profile
Pending:
•	Dark/light mode toggle — not yet implemented
•	Dropdown for city selection — future feature when scaling

PAGE 2 — Categories  /categories
Features built:
•	All 9 categories with icons and real worker counts from Supabase
•	Each category card links to /category/[slug]
Pending:
•	Worker count showing real number from database (some still showing fake counts)

PAGE 3 — Category Worker List  /category/[slug]
Features built:
•	Workers fetched from Supabase by category slug
•	is_free_visible = true workers shown with Call Now button and full number
•	is_free_visible = false workers show masked number +91 XXXXX XXXXX and Unlock button
•	Free counter shows count of is_free_visible workers in that category
•	Unlock button links to /unlock/[category] payment page
Pending:
•	qqq and xxxx dummy workers still appearing in plumber — need manual Supabase delete

PAGE 4 — Worker Profile  /worker/[slug]
Features built:
•	Verified badge, masked phone, Unlock for Rs.10 orange button
•	100% Verified Contact. Secure Payment. trust text
•	About section, services list, gallery, customer reviews
•	Heart wishlist button
Pending:
•	Real photos — currently SVG placeholders
•	Real reviews — currently showing fake review counts

PAGE 5 — Unlock/Payment  /unlock/[category]
Features built:
•	Auth check — redirects to login if not logged in
•	Shows logged in user phone number
•	Rs.10 unlock UI with category name and 3 days access info
•	Pay button UI present
Pending — CRITICAL:
•	Actual Razorpay payment not connected — button shows alert only
•	After payment: numbers do not actually unlock
•	3 day access timer not implemented

PAGE 6 — Login  /login
Features built:
•	Phone number input with +91 prefix
•	Send OTP button — disabled until 10 digits entered
•	TEST MODE: any number + OTP 123456 = logged in
•	Name collection screen after first login
•	Saves user name to Supabase users table
•	Redirects user back to where they were trying to go
•	X close button working
Pending:
•	Real Twilio SMS OTP — replace test mode after Razorpay is complete

PAGE 7 — Profile  /profile
Features built:
•	Shows login prompt if not logged in
•	Shows phone number and display name if logged in
•	Edit name with pencil icon — saves to Supabase
•	Home icon in header — links to home page
•	Logout button — clears session
Pending:
•	My Unlocks section — show paid categories with expiry (after Razorpay done)

PAGE 8 — Wishlist  /unlocks
Features built:
•	Saves to Supabase wishlist table per user phone
•	Persists across logout and login
•	Different users have separate wishlists
•	Empty state with Browse Workers button
•	Remove worker from wishlist
Pending:
•	Minor UI polish on saved worker cards

PAGE 9 — Admin  /admin
Features built:
•	Add worker, edit worker, delete worker
•	Basic CRUD connected to Supabase
Pending:
•	View payments
•	Approve/reject worker applications
•	Worker self-registration review
 
SECTION 6 — Auth System

Current: Test Mode Auth (localStorage)
Login works with any 10-digit phone number. OTP is always 123456. This is for development testing only.

localStorage Key	Value	Purpose
is_logged_in	true / null	Whether user is logged in
user_phone	+91XXXXXXXXXX	Logged in user's phone
user_name	Any string	User's display name
test_phone	10 digits	Temp storage during OTP flow
redirect_after_login	URL string	Where to send user after login
wishlist	JSON array	Cached wishlist (backup — real data in Supabase)

Pending: Real Twilio OTP
•	Create Twilio account — free trial available
•	Add Twilio credentials to Supabase Edge Function secrets
•	Replace test OTP logic in login page with real Supabase phone auth
•	This is the LAST thing to do before public launch
 
SECTION 7 — Payment System (CRITICAL — Not Built Yet)

⚠️  This is the most important pending feature. Without this the business model does not work.

What needs to be built:
1.	Create Razorpay account — free at razorpay.com
2.	Create Supabase Edge Function: create-razorpay-order
3.	Create Supabase Edge Function: verify-razorpay-payment
4.	Connect Pay button on unlock page to create-razorpay-order
5.	On payment success: call verify-razorpay-payment
6.	On verification success: save to payments table with expires_at = now + 3 days
7.	On category page: check payments table — if valid payment exists show numbers
8.	Show countdown timer: Access expires in X days X hours

Payment Flow:
Step	Action	Where
1	User taps Pay Rs.10	Unlock page
2	Frontend calls create-razorpay-order Edge Function	Supabase Edge Function
3	Razorpay popup opens on user phone	Razorpay SDK
4	User pays via UPI/GPay/Card	Razorpay
5	Frontend calls verify-razorpay-payment with signature	Supabase Edge Function
6	Edge Function verifies signature — CRITICAL security step	Supabase Edge Function
7	Payment saved to payments table	Supabase DB
8	Category page unlocks numbers for 3 days	Frontend
 
SECTION 8 — Popular Near You Section

Current behaviour:
•	Fetches workers from Supabase where featured = true
•	Ordered by updated_at descending — newest featured worker appears first
•	No limit — shows all featured workers
•	Split into rows of 3 workers each
•	Each row: horizontal scroll with left/right glass morphism arrows
•	Fade gradient on right edge shows more cards exist
•	Heart wishlist button on each card

Admin control:
•	Go to Supabase → workers table → set featured = true for any worker
•	That worker immediately appears in Popular Near You
•	Most recently featured worker appears at position 1
•	Set featured = false → worker disappears from section
 
SECTION 9 — Free Visible Workers System

Owner controls which workers appear as free contacts (no payment needed) in each category.

How it works:
•	Workers table has column: is_free_visible BOOLEAN
•	Admin sets is_free_visible = true for specific workers in Supabase dashboard
•	Those workers show Call Now button and full number without payment
•	All other workers show masked number and Unlock button
•	Suggested business model: workers pay owner a small fee → owner sets is_free_visible = true
•	Maximum recommended: 2 free visible workers per category
 
SECTION 10 — Completion Status

Area	Status	% Done
UI Design — all pages	Complete — matches reference design	85%
Database — Supabase tables	All tables created and working	90%
Real worker data	54 workers imported — Jagtial	100%
Categories	All 9 categories working	95%
Worker profiles	Complete with unlock UI	85%
Auth — test mode	Working with OTP 123456	60%
Auth — real Twilio OTP	Not built — pending	0%
Wishlist	Complete — Supabase persistent	90%
Popular Near You	Complete with arrows and admin control	90%
Free visible workers	Complete — admin controlled	90%
Payment — Razorpay	UI built — NOT connected	15%
Unlock after payment	Not built	0%
3 day access timer	Not built	0%
Admin panel	Basic CRUD only	40%
Dark mode	Not built	0%
Reviews — real	Not built — showing fake data	5%

Overall Completion: 58%
 
SECTION 11 — What Remains to Complete

Priority 1 — CRITICAL (blocks launch)
•	Fix plumber category — delete qqq and xxxx from Supabase manually
•	Fix mock data showing instead of real Supabase data — remove src/data/workers/ files
•	Connect Razorpay payment — Rs.10 must actually be charged
•	After payment — unlock numbers for 3 days

Priority 2 — Important (before showing to users)
•	Replace fake reviews with 'No reviews yet'
•	Fix worker counts in categories to show real numbers
•	Add dark/light mode toggle
•	Test complete flow on real Android phone on 3G network

Priority 3 — Before public launch
•	Replace test OTP with real Twilio SMS OTP
•	Add real worker photos to Supabase Storage
•	Add more workers from other unions
•	Harden Supabase RLS security
•	Load test on slow 3G connection
 
SECTION 12 — Critical Rules for Developer

Data Rules — NEVER break these:
•	ALL data must come from Supabase ONLY — no mock/hardcoded arrays anywhere
•	src/data/workers/ folder must be deleted — never use these files
•	On any Supabase error: return empty array [] — never return mock data
•	Never add fallback mock data to any fetch function

Security Rules:
•	Razorpay Secret Key must NEVER appear in frontend code
•	Payment verification must happen in Supabase Edge Function only
•	Phone numbers must only be returned after payment verification
•	Admin panel must require password — never publicly accessible

Performance Rules — Mobile 2G/3G users:
•	Every page must load under 3 seconds on 3G
•	No heavy npm packages — vanilla JS preferred
•	Images must be WebP format — max 100KB each
•	No unnecessary re-renders — use server components where possible
•	Never use jQuery, lodash, or other heavy utility libraries

AI Tool Rules — When using Cursor/Codex/Claude:
•	Always start session by telling AI: this project uses Supabase only — no mock data
•	Never ask AI to rewrite entire files — only targeted changes
•	After every AI change: check category/plumber, category/ac-repair, and profile pages
•	If AI adds mock data: immediately revert that change
 
SECTION 13 — File Structure

File/Folder	Purpose
src/app/page.tsx	Home page
src/app/categories/page.tsx	All categories page
src/app/category/[slug]/page.tsx	Worker list for one category
src/app/worker/[slug]/page.tsx	Individual worker profile
src/app/unlock/[category]/page.tsx	Payment/unlock page
src/app/login/page.tsx	Phone OTP login
src/app/profile/page.tsx	User profile and logout
src/app/unlocks/page.tsx	Wishlist page
src/app/admin/page.tsx	Admin panel
src/lib/supabase.ts	Supabase client setup
src/lib/workers.ts	All worker fetch functions — ONLY Supabase queries
src/lib/auth.ts	localStorage auth helpers
src/lib/wishlist.ts	Wishlist Supabase functions
src/lib/users.ts	User name Supabase functions
src/components/PopularWorkersSection.tsx	Popular Near You slider component
src/data/workers/	DELETE THIS FOLDER — mock data — must not exist

END OF DOCUMENT — ServeHome PRD v3.0
