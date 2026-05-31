import type { Category, CategorySlug } from "@/types/category";

/** Single source of truth — all service categories */
export const categories: Category[] = [
  {
    slug: "plumber",
    name: "Plumber",
    titlePlural: "Plumbers",
    label: "PLUMBER",
    workerCount: 28,
    icon: "wrench",
    iconBg: "#DBEAFE",
    iconColor: "#2563EB",
  },
  {
    slug: "electrician",
    name: "Electrician",
    titlePlural: "Electricians",
    label: "ELECTRICIAN",
    workerCount: 18,
    icon: "zap",
    iconBg: "#FFEDD5",
    iconColor: "#F97316",
  },
  {
    slug: "carpenter",
    name: "Carpenter",
    titlePlural: "Carpenters",
    label: "CARPENTER",
    workerCount: 14,
    icon: "hammer",
    iconBg: "#FEF9C3",
    iconColor: "#CA8A04",
  },
  {
    slug: "ac-repair",
    name: "AC Repair",
    titlePlural: "AC Repair",
    label: "AC REPAIR",
    workerCount: 16,
    icon: "snowflake",
    iconBg: "#E0F2FE",
    iconColor: "#0284C7",
  },
  {
    slug: "auto-rental",
    name: "Auto Rental",
    titlePlural: "Auto Rental",
    label: "AUTO RENTAL",
    workerCount: 12,
    icon: "car",
    iconBg: "#EDE9FE",
    iconColor: "#7C3AED",
  },
  {
    slug: "car-rental",
    name: "Car Rental",
    titlePlural: "Car Rental",
    label: "CAR RENTAL",
    workerCount: 15,
    icon: "car-front",
    iconBg: "#FCE7F3",
    iconColor: "#DB2777",
  },
  {
    slug: "painter",
    name: "Painter",
    titlePlural: "Painters",
    label: "PAINTER",
    workerCount: 11,
    icon: "palette",
    iconBg: "#FCE7F3",
    iconColor: "#DB2777",
  },
  {
    slug: "welder",
    name: "Welder",
    titlePlural: "Welders",
    label: "WELDER",
    workerCount: 9,
    icon: "flame",
    iconBg: "#FEE2E2",
    iconColor: "#DC2626",
  },
  {
    slug: "mason",
    name: "Mason",
    titlePlural: "Masons",
    label: "MASON",
    workerCount: 10,
    icon: "brick-wall",
    iconBg: "#F5F5F4",
    iconColor: "#57534E",
  },
];

/** First row on home — 5 categories + More card */
export const HOME_PRIMARY_CATEGORY_SLUGS: CategorySlug[] = [
  "plumber",
  "electrician",
  "carpenter",
  "ac-repair",
  "auto-rental",
];

/** Revealed when More is tapped */
export const HOME_EXPANDED_CATEGORY_SLUGS: CategorySlug[] = [
  "car-rental",
  "painter",
  "welder",
  "mason",
];

const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoryBySlug.get(slug as CategorySlug);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getAllCategorySlugs(): CategorySlug[] {
  return categories.map((c) => c.slug);
}

export function getCategoriesBySlugs(slugs: CategorySlug[]): Category[] {
  return slugs
    .map((slug) => categoryBySlug.get(slug))
    .filter((c): c is Category => Boolean(c));
}

const homePrimaryCategories = getCategoriesBySlugs(HOME_PRIMARY_CATEGORY_SLUGS);
const homeExpandedCategories = getCategoriesBySlugs(HOME_EXPANDED_CATEGORY_SLUGS);

export function getHomePrimaryCategories(): Category[] {
  return homePrimaryCategories;
}

export function getHomeExpandedCategories(): Category[] {
  return homeExpandedCategories;
}

/** @deprecated Use getHomePrimaryCategories */
export function getHomeCategories() {
  return getHomePrimaryCategories().map((c) => ({ ...c, id: c.slug }));
}
