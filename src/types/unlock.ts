import type { Category, CategorySlug } from "@/types/category";

export const UNLOCK_DURATION_DAYS = 3;
export const UNLOCK_FEE_INR = 10;

export type UnlockPageData = {
  category: Category;
  durationDays: number;
  feeInr: number;
  benefits: string[];
  trustPoints: string[];
};

/** Represents a category the user has paid to unlock */
export type UserUnlock = {
  categorySlug: CategorySlug;
  categoryName: string;
  daysRemaining: number;
  hoursRemaining: number;
  unlockedWorkerCount: number;
  totalWorkerCount: number;
};

export type { CategorySlug };
