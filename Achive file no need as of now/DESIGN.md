---
name: Reliable Local Utility
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
  text-primary: '#111827'
  text-secondary: '#6B7280'
  surface-white: '#FFFFFF'
  border-subtle: '#E5E7EB'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  inset-container: 16px
  gutter-grid: 12px
  touch-target-min: 48px
---

## Brand & Style

The design system is engineered for high utility, immediate trust, and radical ease of use. It targets a local demographic including older users and individuals operating on limited mobile data plans. The brand personality is dependable, neighborly, and transparent.

We employ a **Corporate / Modern** design style stripped of any unnecessary visual weight. By avoiding heavy gradients, blurs, and complex shadows, the system remains performant on low-end devices while maintaining a professional aesthetic. The focus is on high legibility, clear calls to action, and a "lightweight-first" architecture that prioritizes content over ornamentation.

The visual narrative centers on "The Verified Path"—using clear structural markers and a bright, optimistic palette to guide users from a problem (e.g., a broken pipe) to a solution (a verified worker) in as few steps as possible.

## Colors

The color palette is functional and semantic. **Primary Blue** is reserved for core navigation and standard actions, signaling stability. **Orange CTA** is used exclusively for high-priority conversion points—specifically the "Unlock" mechanism—to draw the eye immediately. **Success Green** serves as a trust signal for verified badges and positive ratings.

To ensure maximum performance and accessibility:
- **No Dark Mode:** The system is locked to light mode to maintain high contrast for outdoor use and older eyes.
- **Background vs. Surface:** Use the Light Grey background (#F8FAFC) to create a natural "well" for the White Surface cards (#FFFFFF) to sit in, providing depth without the need for heavy shadows.
- **Contrast:** Text colors are strictly controlled to pass WCAG AA standards against all surface types.

## Typography

This design system uses **Be Vietnam Pro** for its friendly, approachable character and exceptional legibility on small screens. The type scale is optimized for mobile-first consumption.

- **Legibility First:** The minimum body size is strictly 14px to accommodate older users.
- **Visual Hierarchy:** Headings use heavy weights (700) to create clear section breaks even when users are scanning quickly.
- **Spacing:** Increased line-heights are applied to body text to prevent "crowding" on small Android displays, ensuring a comfortable reading experience even on 360px wide screens.

## Layout & Spacing

The layout is a **fluid grid** optimized for mobile viewports. On mobile devices, we utilize a 2-column grid for category discovery and a single-column stack for worker lists.

- **Grid System:** A 12-column grid is used for desktop, but mobile relies on a simple 2-column split with 12px gutters.
- **Margins:** A consistent 16px (1rem) safe area is maintained on the left and right edges of all screens.
- **Thumb-Zone Optimization:** Critical actions (Call, Unlock, Navigation) are placed within the lower 60% of the screen.
- **Performance:** Avoid complex flex-box layouts where simple block displays suffice, ensuring rapid rendering on slow SIM connections.

## Elevation & Depth

To maintain a lightweight footprint, this design system rejects heavy blurs and multi-layered shadows. Depth is conveyed through **Tonal Layering**:

- **Level 0 (Base):** The #F8FAFC background.
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF) surfaces.
- **Level 2 (Active States):** Instead of shadows, use a 1px border (#E5E7EB) to define card boundaries.
- **Interaction:** When a user taps a card, a subtle scale-down (98%) provides tactile feedback without requiring the engine to re-render complex shadow pixels.

This approach ensures the UI feels "snappy" even on older Android handsets.

## Shapes

The shape language is consistently **Rounded** (0.5rem / 8px). This softens the "industrial" feel of a worker directory and makes the interface feel more modern and welcoming.

- **Category Cards:** Use `rounded-xl` (1.5rem) to emphasize their role as the primary entry points.
- **Buttons & Inputs:** Use the standard `rounded-md` (0.5rem) for a balanced, clickable appearance.
- **Avatars:** Worker photos should be circular or have high roundedness to emphasize the "person" behind the service.
- **Badges:** Use "Pill" shapes for status indicators like "Verified" or "Active" to distinguish them from clickable buttons.

## Components

### Buttons
- **Primary:** High-contrast Blue (#2563EB) with White text. Min-height 48px.
- **CTA (Unlock):** Orange (#F97316) with White text. Bold weight.
- **Call Button:** Green (#22C55E) with a prominent Lucide "Phone" icon.

### Cards
- **Category Card:** 2-column grid, centered large icon, label below. High-radius corners.
- **Worker Card:** White surface, 1px border. Layout: Left-aligned photo (64px), Name (Headline-md), Area (Body-md), and a distinct "Verified" badge in the top-right corner.

### Trust Indicators
- **Verified Badge:** A small green pill with a checkmark icon.
- **Rating:** Star icon (Orange) followed by the numerical score and review count in parentheses (e.g., 4.8 (22)).

### Input Fields
- **Search Bar:** Large, rounded (pill-style), background #FFFFFF, 1px border #E5E7EB. 48px height minimum.

### Navigation
- **Bottom Bar:** Fixed to viewport bottom. 4 icons (Home, Categories, Unlocks, Profile) with 12px labels. Active state indicated by Primary Blue color and a 2px top-border on the active tab.