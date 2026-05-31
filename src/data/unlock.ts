import { getCategoryBySlug } from "@/data/categories";
import { getWorkersByCategory } from "@/data/workers";
import type { CategorySlug } from "@/types/category";
import type { Worker } from "@/types/worker";
import type { UserUnlock } from "@/types/unlock";
import {
  UNLOCK_DURATION_DAYS,
  UNLOCK_FEE_INR,
  type UnlockPageData,
} from "@/types/unlock";

const defaultBenefits = [
  "View all remaining worker phone numbers in this category",
  "Call workers directly from your phone",
  "Instant access after successful payment",
  "Verified local professionals only",
];

const defaultTrustPoints = [
  "Verified local workers",
  "Secure payment via Razorpay",
  "Instant access after payment",
];

export function getUnlockPageData(categorySlug: string): UnlockPageData | null {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  return {
    category,
    durationDays: UNLOCK_DURATION_DAYS,
    feeInr: UNLOCK_FEE_INR,
    benefits: defaultBenefits,
    trustPoints: defaultTrustPoints,
  };
}

// ---------------------------------------------------------------------------
// My Unlocks — mock data for the /unlocks page
// ---------------------------------------------------------------------------

/** Mock: categories the current user has paid to unlock */
const MOCK_UNLOCKED_SLUGS: CategorySlug[] = ["plumber", "electrician"];

export function getUserUnlocks(): UserUnlock[] {
  return MOCK_UNLOCKED_SLUGS.map((slug, index) => {
    const category = getCategoryBySlug(slug);
    if (!category) return null;

    const workers = getWorkersByCategory(slug);
    const unlocked = workers.filter((w) => w.isUnlocked);

    return {
      categorySlug: slug,
      categoryName: category.name,
      daysRemaining: index === 0 ? 2 : 1,
      hoursRemaining: index === 0 ? 14 : 6,
      unlockedWorkerCount: unlocked.length,
      totalWorkerCount: workers.length,
    } satisfies UserUnlock;
  }).filter((u): u is UserUnlock => u !== null);
}

/** Returns unlocked workers grouped by category slug */
export function getUnlockedWorkersByCategory(): {
  slug: CategorySlug;
  categoryName: string;
  workers: Worker[];
}[] {
  return MOCK_UNLOCKED_SLUGS.map((slug) => {
    const category = getCategoryBySlug(slug);
    const workers = getWorkersByCategory(slug).filter((w) => w.isUnlocked);
    return {
      slug,
      categoryName: category?.name ?? slug,
      workers,
    };
  }).filter((group) => group.workers.length > 0);
}
