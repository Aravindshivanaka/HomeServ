# SERVEHOME — FINAL MVP PRODUCT REQUIREMENTS DOCUMENT

## Version

Version 3.0 — Final MVP Build

## Product Type

Mobile-First Local Worker Discovery Website

## Target Launch Area

Single Town / Local Area Only

## Target Users

* Local families
* Students
* Shop owners
* Parents
* Apartment residents
* Users searching workers urgently
* Android mobile users using SIM internet

---

# 1. PRODUCT VISION

ServeHome is a lightweight mobile-first website where users can quickly find trusted local workers.

The platform is NOT a booking app.

The platform is NOT an Urban Company clone.

ServeHome is a:

* worker discovery platform
* contact unlocking platform
* trusted local worker directory

Users:

1. Open website
2. Choose category
3. View some free worker numbers
4. Unlock remaining numbers for Rs.10
5. Call worker directly

No booking.
No scheduling.
No commissions from workers.
No complicated flows.

The main goal:
"Find trusted workers fast."

---

# 2. IMPORTANT BUSINESS DECISIONS

## 2.1 Launch Scope

ServeHome will launch ONLY in:

* one town
* one local market
* one operating area

NOT all India.
NOT multiple cities.

Reason:
Marketplace businesses fail when supply is weak.

The initial goal is:

* 50 high-quality verified workers
* 3–5 strong categories
* dense local coverage

---

## 2.2 Initial Categories

Launch only with:

* Plumber
* Electrician
* Carpenter
* AC Repair
* Auto Rental
* Car Rental

Optional later:

* Painter
* Mason
* Welder
* Cook
* Sweeper

---

## 2.3 Worker Source

Workers will initially come from:

* local unions
* known contacts
* verified references
* manual admin entry

NO self-registration in V1.

Reason:
Admin quality control is critical during launch.

---

# 3. CORE BUSINESS MODEL

## Free + Paid Unlock Model

### Before Payment

Users can:

* browse categories
* see worker names
* see area
* see ratings
* access FIRST 2 or 3 worker phone numbers FREE

Remaining numbers stay locked.

Example:

"3 Free Numbers Remaining"

After clicking one free worker:

"2 Free Numbers Remaining"

This counter must be clearly visible.

---

## Paid Unlock

User pays:

* Rs.10

User receives:

* all remaining numbers in that category
* access for 3 days

Example:

* User unlocks plumbers
* all plumber numbers visible for 3 days

After expiry:

* category locks again

---

# 4. IMPORTANT TRUST STRATEGY

The platform is new.
Users will not trust instantly.

Therefore the UI must strongly show:

* verified workers
* ratings
* review count
* union labels
* real photos where possible
* local area names

Trust matters more than animations.

---

# 5. OTP LOGIN DECISION

## Final Decision

DO NOT require OTP login before browsing.

Users can:

* browse freely
* use free unlocks freely
* view worker profiles freely

OTP login required ONLY during payment unlock.

---

## Reason

Indian users are cautious about OTPs.

If OTP appears immediately:

* trust drops
* users leave
* conversion decreases

Therefore:

* browsing must feel open
* payment stage can require verification

---

## Final Authentication Flow

### Before Payment

No login needed.

### During Payment Unlock

User enters:

* mobile number
* OTP

Then:

* Razorpay payment opens

Reason:
System needs:

* unlock tracking
* payment history
* review verification
* anti-abuse protection

---

# 6. FINAL TECHNOLOGY STACK

## IMPORTANT

This stack is selected specifically for:

* non-technical founder
* AI-assisted development
* lightweight performance
* free hosting
* mobile-first UI

---

## Frontend

### Framework

Next.js

Reason:

* structured
* scalable
* AI tools generate better code for it
* easier than manual vanilla JS maintenance

---

## Styling

Tailwind CSS

Reason:

* fast UI building
* mobile responsive
* modern UI
* AI-friendly

---

## UI Components

shadcn/ui

Reason:

* beautiful modern components
* accessible
* free
* clean code

---

## Backend

Supabase

Used for:

* database
* authentication
* APIs
* edge functions
* admin data

---

## Payment Gateway

Razorpay

Used for:

* UPI
* Google Pay
* Paytm
* PhonePe
* Cards

---

## Hosting

Vercel

Reason:

* free
* easy deploy
* optimized for Next.js

---

## Fonts

Google Fonts — Poppins

---

## Icons

Lucide Icons

---

# 7. PERFORMANCE REQUIREMENTS

This website is built for:

* Android phones
* slow SIM internet
* 2G / 3G / 4G users

Performance is CRITICAL.

---

## Required Targets

| Item                    | Target          |
| ----------------------- | --------------- |
| Home Page Load          | Under 3 seconds |
| Page Size               | Under 700KB     |
| Image Format            | WebP            |
| Category Icon Size      | Under 50KB      |
| Worker Image Size       | Under 100KB     |
| Mobile Width Support    | 360px minimum   |
| Lighthouse Mobile Score | 85+             |

---

## Rules

DO:

* lazy load images
* compress images
* avoid large animations
* use minimal JavaScript
* cache static assets

DO NOT:

* use videos
* use large sliders
* use heavy libraries
* use unnecessary APIs

---

# 8. DESIGN DIRECTION

## Main Inspiration

Primary inspiration should come from:

* the first attached UI reference
* large rounded category cards
* simple category browsing
* lightweight visuals
* clean spacing

The second UI reference should be used ONLY for:

* worker list card structure
* profile layout inspiration

DO NOT copy:

* booking flows
* pricing layouts
* message buttons
* scheduling UI

---

# 9. DESIGN STYLE

## General Feel

The UI should feel:

* trustworthy
* clean
* modern
* lightweight
* easy for older users

NOT futuristic.
NOT complex.
NOT crowded.

---

## UI Rules

### Category Cards

Must be:

* large
* rounded corners
* easy to tap
* visually separated

Reason:
Many users are older users.

---

## Grid Rules

Mobile category grid:

* 2 columns
* large cards
* large icons
* readable labels

DO NOT use 4 tiny icons per row.

That becomes difficult for older users.

---

## Home Banner

Small lightweight carousel.

Requirements:

* auto slide every 4 seconds
* only 2 or 3 slides maximum
* lightweight images only
* no video

Banner ratio:

* approximately 1:2

Banner examples:

* "Trusted Local Workers"
* "50+ Verified Professionals"
* "Call Workers Directly"

---

# 10. COLOR PALETTE

## Primary Colors

| Purpose          | Color   |
| ---------------- | ------- |
| Primary Blue     | #2563EB |
| Orange CTA       | #F97316 |
| Light Background | #F8FAFC |
| Card Background  | #FFFFFF |
| Dark Text        | #111827 |
| Grey Text        | #6B7280 |
| Success Green    | #22C55E |
| Border           | #E5E7EB |

---

# 11. TYPOGRAPHY

## Font

Poppins

---

## Font Sizes

| Element         | Size |
| --------------- | ---- |
| Logo            | 24px |
| Main Heading    | 22px |
| Section Heading | 18px |
| Worker Name     | 16px |
| Body Text       | 14px |
| Small Labels    | 12px |
| Buttons         | 15px |

---

# 12. WEBSITE STRUCTURE

# PAGE 1 — HOME PAGE

## URL

/

---

## Top Bar

LEFT:

* ServeHome logo

RIGHT:

* notification icon placeholder

NO dark mode initially.

---

## Search Bar

Features:

* category search
* instant filtering
* mobile-friendly
* rounded design

Placeholder:
"Search workers or services"

---

## Banner Carousel

Small lightweight banner.

Auto rotate.

Maximum:

* 3 slides

---

## Category Section

Large rounded category cards.

2 columns.

Each card contains:

* illustration icon
* category name
* number of workers

Example:
"Plumbing"
"12 Workers"

---

## Popular Workers Section

Horizontal scrolling cards.

Each card shows:

* worker photo
* first name
* category
* area
* star rating
* verified badge

---

## Bottom Navigation

Tabs:

* Home
* Categories
* Unlocks
* Profile

Fixed at bottom.

---

# PAGE 2 — CATEGORY WORKER LIST

## URL

/category/[name]

---

## Top Section

Contains:

* back button
* category title
* worker count

Example:
"Plumbers (28)"

---

## Free Unlock Counter

Very important UI element.

Example:

"3 Free Numbers Remaining"

After one click:

"2 Free Numbers Remaining"

Must update instantly.

---

## Worker Cards

Each worker card contains:

* photo
* first name
* category label
* area
* star rating
* verified badge
* call button state

---

## Free Worker Logic

First 2 or 3 workers:

* visible phone numbers
* direct call button

Remaining workers:

* locked number
* unlock CTA

Example:
"Unlock Remaining 22 Numbers — Rs.10"

---

## Paid State

After payment:

* all numbers visible
* all call buttons active
* timer shown

Example:
"Access expires in 2 days 6 hours"

---

# PAGE 3 — WORKER PROFILE PAGE

## URL

/worker/[id]

---

## Top Hero Section

Contains:

* worker image
* worker name
* category
* area
* rating
* verified badge

---

## Contact Section

### Free Worker

Show:

* visible number
* call button

### Locked Worker

Show:

* partially hidden number
* unlock button

### Paid User

Show:

* full number
* active call button

---

## Reviews Section

IMPORTANT:
Reviews should stay SIMPLE in V1.

No complicated review system initially.

---

## V1 Review Structure

Each worker contains:

* average rating
* review count
* simple comments

Example:

* 4.7 stars
* 18 reviews

Review card:

* first name only
* short comment

---

## Review Rules

Only paid users can review.

One review per worker per user.

---

# PAGE 4 — PAYMENT PAGE

## URL

/pay/[category]

---

## UI

Simple clean page.

Contains:

* category name
* unlock duration
* price
* secure payment text
* Razorpay button

---

## Payment Flow

1. User taps unlock
2. User enters mobile number
3. OTP verification
4. Razorpay popup opens
5. Payment success verified on backend
6. Numbers unlock

---

# PAGE 5 — MY UNLOCKS

## URL

/unlocks

Shows:

* unlocked categories
* expiry date
* active status

---

# PAGE 6 — ADMIN PANEL

## URL

/admin

---

## Admin Login

Email + password only.

---

## Admin Features

### Workers

Admin can:

* add worker
* edit worker
* delete worker
* mark verified

---

### Payments

Admin can:

* view payment history
* see unlocked categories
* see total revenue

---

### Reviews

Admin can:

* delete fake reviews
* moderate abuse

---

# 13. DATABASE STRUCTURE

# TABLE 1 — workers

| Column         | Type      |
| -------------- | --------- |
| id             | UUID      |
| first_name     | TEXT      |
| full_name      | TEXT      |
| phone_number   | TEXT      |
| category       | TEXT      |
| city           | TEXT      |
| area           | TEXT      |
| profile_image  | TEXT      |
| is_verified    | BOOLEAN   |
| average_rating | DECIMAL   |
| total_reviews  | INTEGER   |
| created_at     | TIMESTAMP |

---

# TABLE 2 — users

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| phone      | TEXT      |
| created_at | TIMESTAMP |

---

# TABLE 3 — payments

| Column              | Type      |
| ------------------- | --------- |
| id                  | UUID      |
| user_id             | UUID      |
| category            | TEXT      |
| amount              | INTEGER   |
| razorpay_payment_id | TEXT      |
| paid_at             | TIMESTAMP |
| expires_at          | TIMESTAMP |

---

# TABLE 4 — reviews

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| worker_id  | UUID      |
| user_id    | UUID      |
| rating     | INTEGER   |
| comment    | TEXT      |
| created_at | TIMESTAMP |

---

# 14. SECURITY RULES

## CRITICAL

Phone numbers must NEVER be publicly exposed.

---

## Rules

### DO

* verify Razorpay payment on backend
* use Supabase Row Level Security
* keep secret keys in environment variables
* use HTTPS only

### DO NOT

* expose phone numbers in frontend HTML
* store Razorpay secret in frontend
* unlock numbers before backend verification

---

# 15. MOBILE UX RULES

## Touch Targets

Buttons must be:

* large
* thumb-friendly
* minimum 48px height

---

## Readability

Never use tiny text.

Minimum font size:

* 14px

---

## Scroll Behavior

No horizontal scrolling anywhere.

---

## Network Optimization

The website must remain usable on:

* 3G
* weak mobile networks

---

# 16. FEATURES REMOVED FROM MVP

The following are intentionally removed from V1:

* PWA
* dark mode
* worker self-registration
* advanced analytics
* push notifications
* chat system
* booking system
* map tracking
* appointment scheduling
* social login

Reason:
Focus only on:

* validation
* speed
* simplicity
* trust
* worker quality

---

# 17. FINAL DEVELOPMENT APPROACH

## IMPORTANT

The founder is non-technical.

Therefore:

* architecture must stay simple
* code must stay organized
* deployment must stay easy
* future editing must stay manageable

---

## AI Development Workflow

Recommended workflow:

1. Use Codex / Claude Code
2. Build one page at a time
3. Test on mobile immediately
4. Never build all features together
5. Complete frontend first
6. Add backend second
7. Add payment flow third

---

# 18. MVP BUILD ORDER

## STEP 1

Build:

* home page
* category page
* worker profile page

Frontend only.

---

## STEP 2

Connect:

* Supabase database
* worker data

---

## STEP 3

Build:

* free unlock counter
* locked number system

---

## STEP 4

Integrate:

* OTP login
* Razorpay

---

## STEP 5

Build:

* admin panel

---

## STEP 6

Add:

* ratings
* reviews
* moderation

---

# 19. SUCCESS METRICS

The MVP is successful if:

* users actually call workers
* workers receive calls regularly
* users return again
* people are willing to pay Rs.10
* users trust worker quality

NOT based on:

* fancy UI
* animations
* complex features

---

# 20. FINAL PRODUCT PHILOSOPHY

ServeHome should feel like:

"The fastest and simplest way to find trusted local workers."

The product must prioritize:

1. speed
2. simplicity
3. trust
4. mobile usability
5. lightweight performance

Everything else is secondary.

---

END OF DOCUMENT
