import {
  getAllCategorySlugs,
  getCategoryListing,
  isValidCategorySlug,
} from "@/data";

export function getCategorySlugs(): string[] {
  return getAllCategorySlugs();
}

export function getCategoryListingBySlug(slug: string) {
  return getCategoryListing(slug);
}

export { isValidCategorySlug };
