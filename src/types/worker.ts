import type { CategorySlug } from "@/types/category";

export type Worker = {
  id: string;
  categorySlug: CategorySlug;
  name: string;
  /** Uppercase badge on listing cards, e.g. PLUMBER */
  categoryLabel: string;
  /** Display name for home / profile, e.g. Plumber */
  categoryDisplay: string;
  area: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  isVerified: boolean;
  imageUrl: string;
  isUnlocked: boolean;
  /** Partially masked number — locked workers only */
  phoneMasked?: string;
};

/** Subset used on the home “Popular Near You” carousel */
export type PopularWorker = Pick<
  Worker,
  | "id"
  | "name"
  | "area"
  | "rating"
  | "reviewCount"
  | "isVerified"
  | "imageUrl"
> & {
  category: string;
};
