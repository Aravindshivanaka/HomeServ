import { getCategoryBySlug, getAllCategorySlugs } from "@/data/categories";
import {
  getAllWorkers,
  getWorkerById,
  getWorkersByCategory,
} from "@/data/workers";
import type { CategoryListing, CategorySlug } from "@/types/category";
import { buildProfileDetails } from "@/data/workers/profile-details";
import { getFallbackReviews, getReviewsByWorkerId } from "@/data/reviews";
import type { PopularWorker, Worker } from "@/types/worker";
import type { WorkerProfile } from "@/types/worker-profile";

export {
  categories,
  getAllCategories,
  getCategoryBySlug,
  getAllCategorySlugs,
  getHomePrimaryCategories,
  getHomeExpandedCategories,
  HOME_EXPANDED_CATEGORY_SLUGS,
  HOME_PRIMARY_CATEGORY_SLUGS,
} from "@/data/categories";
export { getWorkersByCategory, getWorkerById, getAllWorkers } from "@/data/workers";
export {
  getFallbackReviews,
  getReviewsByWorkerId,
  reviews,
} from "@/data/reviews";

const FREE_UNLOCKS_REMAINING = 2;

export function getCategoryListing(slug: string): CategoryListing | null {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const workers = getWorkersByCategory(category.slug);
  if (workers.length === 0) return null;

  return {
    slug: category.slug,
    titlePlural: category.titlePlural,
    workerCount: category.workerCount,
    freeUnlocksRemaining: FREE_UNLOCKS_REMAINING,
    workers,
  };
}

export function toPopularWorker(worker: Worker): PopularWorker {
  return {
    id: worker.id,
    name: worker.name,
    category: worker.categoryDisplay,
    area: worker.area,
    rating: worker.rating,
    reviewCount: worker.reviewCount,
    isVerified: worker.isVerified,
    imageUrl: worker.imageUrl,
  };
}

const popularWorkersCache = (() => {
  return getAllWorkers().map(toPopularWorker);
})();

/** First unlocked worker from top home categories */
export function getPopularWorkers(): PopularWorker[] {
  return popularWorkersCache;
}

export function isValidCategorySlug(slug: string): slug is CategorySlug {
  return getAllCategorySlugs().includes(slug as CategorySlug);
}

export function getWorkerProfile(workerId: string): WorkerProfile | null {
  const worker = getWorkerById(workerId);
  if (!worker) return null;

  const stored = getReviewsByWorkerId(workerId);
  const profileReviews =
    stored.length >= 2
      ? stored
      : [...stored, ...getFallbackReviews(worker, 2 - stored.length)];

  return {
    worker,
    details: buildProfileDetails(worker),
    reviews: profileReviews.slice(0, 2),
  };
}

export function getAllWorkerIds(): string[] {
  return getAllWorkers().map((w) => w.id);
}

export {
  getUnlockPageData,
  getUserUnlocks,
  getUnlockedWorkersByCategory,
} from "@/data/unlock";
