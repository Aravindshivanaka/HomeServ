---
name: Modern Local Trust
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#006229'
  on-tertiary: '#ffffff'
  tertiary-container: '#007e37'
  on-tertiary-container: '#c1ffc5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#6bff8f'
  tertiary-fixed-dim: '#4ae176'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005321'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  text-main: '#111827'
  text-muted: '#6B7280'
  border-light: '#E5E7EB'
  surface-white: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Poppins
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  section-title:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  button-text:
    fontFamily: Poppins
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 1rem
  stack-gap-sm: 0.5rem
  stack-gap-md: 1rem
  stack-gap-lg: 1.5rem
  grid-gutter: 1rem
  touch-target-min: 48px
---

## Brand & Style

The design system is centered on the "Modern Indian Local-Services" aesthetic: a blend of high-utility corporate reliability and warm, approachable neighborhood trust. It targets a mobile-first audience ranging from tech-savvy students to older homeowners who require high legibility and intuitive navigation.

The visual style is **Corporate / Modern** with a lean towards **Tactile** softness. It avoids the coldness of pure minimalism by using generous corner radii, soft shadows, and a bright, optimistic color palette. The interface prioritizes "trust markers" (verified badges, real photography, clear ratings) over decorative elements.

**Key Stylistic Pillars:**
- **Accessibility First:** Large touch targets (min 48px) and high-contrast text for outdoor readability on mobile devices.
- **Lightweight Depth:** Use of subtle tonal layers and soft shadows to create a clear "card-on-surface" hierarchy.
- **Soft Modernity:** Extensive use of large rounded corners to make the UI feel friendly and non-threatening.
- **Performance Focused:** Minimal use of heavy assets, relying on CSS-based styling and system-compatible fonts to ensure speed on 3G/4G networks.

## Colors

The palette is anchored by a trustworthy **Primary Blue**, used for core navigation and primary actions. The **Orange CTA** is reserved exclusively for high-conversion moments, specifically the "Unlock" and "Call" actions, ensuring they stand out against the calm background.

**Color Usage Guidelines:**
- **Primary Blue (#2563EB):** Used for headers, active tab icons, and "View Profile" actions.
- **Orange CTA (#F97316):** High-priority buttons and "Locked" status indicators.
- **Success Green (#22C55E):** Exclusively for "Verified" badges and successful payment confirmations.
- **Background Strategy:** A very light grey base (#F8FAFC) provides contrast for pure white (#FFFFFF) cards, creating a natural sense of depth without needing heavy borders.
- **Gradients:** Use soft vertical gradients (Primary Blue to a slightly lighter tint) only on large action buttons to give them a tactile, "pressable" feel.

## Typography

The design system utilizes **Poppins** across all levels to maintain a clean, geometric, and modern feel. The scale is optimized for mobile readability, ensuring no text falls below 12px.

**Type Hierarchy Rules:**
- **Weight as Hierarchy:** Use SemiBold (600) for names and headings to create immediate visual anchors. Medium (500) is used for labels and buttons to ensure they remain legible over color backgrounds.
- **Readability:** Body text uses a generous 1.5x line height to prevent fatigue on smaller screens.
- **Contrast:** Always use "Dark Text" (#111827) for headings and "Grey Text" (#6B7280) for secondary metadata like "Area" or "Review Count."

## Layout & Spacing

The design system follows a **Fixed-Fluid hybrid grid** optimized for mobile viewports (minimum 360px). It relies on a consistent 16px (1rem) safe margin on the left and right edges of the screen.

**Layout Patterns:**
- **Category Grid:** A strict 2-column grid for the home screen to ensure cards are large enough for easy tapping.
- **Vertical Stacking:** Worker lists use a single-column layout with 12px spacing between cards.
- **Touch Safety:** All interactive elements maintain a minimum height of 48px. Even if a label is small, the invisible hit area must extend to meet this requirement.
- **Rhythm:** Use "Stacking" (vertical spacing) to group related information. For example, 4px between a Worker Name and their Rating, but 16px between the card content and the "Call Now" button.

## Elevation & Depth

This design system uses **Tonal Layers** combined with **Ambient Shadows** to define hierarchy. Since there is no dark mode, depth is created by the contrast between the light grey background and white floating surfaces.

**Elevation Levels:**
- **Level 0 (Background):** #F8FAFC. The lowest layer.
- **Level 1 (Cards):** #FFFFFF surface with a very soft, diffused shadow: `0px 4px 12px rgba(17, 24, 39, 0.05)`. Used for category cards and worker list items.
- **Level 2 (Active/Sticky):** Used for the Bottom Navigation Bar and top search bars. These feature a slightly stronger shadow to indicate they sit above the scrolling content: `0px -2px 10px rgba(17, 24, 39, 0.08)`.
- **Outlines:** Use a subtle 1px border (#E5E7EB) on cards only if the shadow is insufficient for separation on lower-quality mobile displays.

## Shapes

The shape language is "Extra Rounded" to evoke a sense of friendliness and safety.

**Rounding Rules:**
- **Standard Cards:** Use `rounded-lg` (16px / 1rem) for category and worker cards.
- **Small Elements:** Use `rounded-md` (8px / 0.5rem) for input fields, badges, and small "View Profile" buttons.
- **CTAs:** Large action buttons like "Call Now" or "Unlock" should use `rounded-xl` (24px / 1.5rem) to appear soft and tactile.
- **Avatars:** Worker profile photos should be circular or have a minimum 12px radius to match the card language.

## Components

### Buttons
- **Primary (Call/Unlock):** Orange background, white text, 48px height. Includes a Lucide "Phone" icon.
- **Secondary (View Profile):** White background, Blue border/text, or light blue tint background.
- **Ghost:** Used for "View All" links or back buttons; text-only with no container.

### Worker Cards
- **Structure:** Left-aligned avatar (64px), followed by a text stack (Name, Category Badge, Rating), and a full-width action button at the bottom or right-aligned.
- **Badges:** Small, rounded-md containers for "Verified" (Green tint) and "Category" (Light Grey tint).

### Category Cards (Home)
- **Design:** Large 2-column square-ish cards. 
- **Content:** Centralized soft illustration (e.g., a 3D-style wrench for plumbing), followed by the Category Name in SemiBold, and a sub-label for "Worker Count."

### Unlock Counter
- **Style:** A floating or pinned horizontal bar at the top of worker lists.
- **Visuals:** Light Blue background with dark text. Highlights the remaining number in Bold.

### Input Fields
- **Search Bar:** 48px-56px height, rounded-full or rounded-xl, with a subtle inner shadow and a leading Lucide "Search" icon.

### Bottom Navigation
- **Style:** Fixed at the bottom, white background, 1px top border.
- **Active State:** Blue icon and label; inactive state is grey. Icons should be 24px Lucide variants.