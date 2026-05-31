# SERVEHOME — MASTER FRONTEND DEVELOPMENT PROMPT

Build a mobile-first local worker discovery website called “ServeHome”.

IMPORTANT:
This is NOT a booking app.
This is NOT an Urban Company clone.

ServeHome is:

* a local worker discovery platform
* a direct calling platform
* a trusted worker directory

Users:

* browse workers
* unlock phone numbers
* directly call workers

NO booking system.
NO scheduling.
NO chat system.
NO complex marketplace flows.

---

# TECH STACK

Use ONLY:

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide Icons

Do NOT use:

* Material UI
* Bootstrap
* Chakra UI
* heavy animation libraries
* Redux
* unnecessary packages

---

# MOBILE-FIRST REQUIREMENTS

The website is built primarily for:

* Android users
* mobile-data users
* slower phones
* weak 3G/4G networks

IMPORTANT:
The UI must feel lightweight and fast.

Target:

* Lighthouse mobile score above 85
* fast loading on mobile Chrome
* optimized for 360px width

---

# DESIGN STYLE

Use the attached UI reference screens and FINAL_DESIGN_SYSTEM.md as the PRIMARY design direction.

The UI should feel:

* trustworthy
* modern
* lightweight
* soft
* easy to use
* highly readable

Use:

* rounded cards
* soft shadows
* large touch-friendly buttons
* white card surfaces
* light grey background
* blue primary actions
* orange unlock CTA

Avoid:

* glassmorphism
* futuristic effects
* dark mode
* heavy gradients
* large animations
* cluttered layouts

---

# TYPOGRAPHY

Use:

* Poppins font

Rules:

* minimum body text 14px
* strong heading hierarchy
* highly readable spacing

---

# CORE COLORS

Primary Blue:
#2563EB

Orange CTA:
#F97316

Background:
#F8FAFC

White Cards:
#FFFFFF

Dark Text:
#111827

Grey Text:
#6B7280

Border:
#E5E7EB

Success Green:
#22C55E

---

# PROJECT STRUCTURE

Create clean scalable folder structure.

Use:

/app
/components
/components/ui
/components/cards
/components/navigation
/components/workers
/lib
/types
/data
/styles

Keep components modular and reusable.

---

# INITIAL PAGES TO BUILD

Build ONLY frontend UI with static mock data.

NO backend yet.
NO Supabase yet.
NO Razorpay yet.
NO OTP yet.

Use mock worker data.

---

# REQUIRED PAGES

## 1. HOME PAGE

Features:

* top greeting section
* notification icon
* large search bar
* lightweight hero banner
* category grid
* popular workers section
* bottom navigation

Category cards:

* 2-column grid
* large rounded cards
* large touch targets

Popular worker cards:

* photo
* worker name
* verified badge
* rating
* area
* Call Now button
* View Profile button

DO NOT show pricing.

---

## 2. CATEGORY PAGE

Features:

* category title
* worker count
* free unlock counter
* worker cards
* locked/unlocked states

Unlocked workers:

* Call Now button

Locked workers:

* Unlock for Rs.10 button

Worker cards:

* large readable layout
* rounded white cards
* subtle shadows
* clean spacing

---

## 3. WORKER PROFILE PAGE

Features:

* worker image
* worker name
* verified badge
* experience years
* area/location
* reviews
* gallery
* Call Now button

DO NOT show pricing anywhere.

Use:

* experience
* trust indicators
* reviews
* locality

---

## 4. UNLOCK PAGE

Features:

* unlock summary
* category details
* duration
* price
* OTP mobile input
* Razorpay CTA button

Frontend UI only.

---

# COMPONENT RULES

Buttons:

* minimum height 48px
* rounded-xl
* highly touch friendly

Cards:

* white background
* soft shadow
* rounded-xl
* mobile optimized

Bottom Navigation:

* fixed bottom
* 4 tabs
* Home
* Categories
* Unlocks
* Profile

---

# PERFORMANCE RULES

IMPORTANT:

* lazy load images
* use Next.js Image component
* avoid unnecessary re-renders
* avoid heavy JS
* avoid large packages
* optimize for weak mobile networks

DO NOT:

* use videos
* use carousels with heavy animation
* use complex transitions
* use unnecessary effects

---

# DEVELOPMENT RULES

* build one page at a time
* keep components reusable
* use clean TypeScript types
* avoid deeply nested components
* avoid hardcoded repeated UI
* maintain consistent spacing

---

# FINAL OUTPUT REQUIREMENT

Generate:

* clean production-quality frontend
* responsive mobile-first UI
* organized reusable components
* modern lightweight codebase

The final result should feel like:
“the fastest and simplest way to find trusted local workers.”
