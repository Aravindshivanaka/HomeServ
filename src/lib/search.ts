import { getAllCategories, getAllWorkers } from "@/data";
import { servicesByCategory } from "@/data/workers/services-by-category";
import type { Category, Worker } from "@/types";

/**
 * Checks if query matches the target text in a case-insensitive manner.
 * Prioritizes word-prefix matches (e.g., query "E" matches "Electrician" and "Eshwar").
 * If the query is 3+ characters, also supports substring matches.
 */
export function matchesQuery(text: string, query: string): boolean {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return false;

  const cleanText = text.toLowerCase();

  // Split target text into words by space, hyphens, slashes, or underscores
  const words = cleanText.split(/[\s\-_/]+/);
  if (words.some((word) => word.startsWith(cleanQuery))) {
    return true;
  }

  // Substring match for longer search queries
  if (cleanQuery.length >= 3 && cleanText.includes(cleanQuery)) {
    return true;
  }

  return false;
}

export type SearchResults = {
  categories: Category[];
  workers: Worker[];
};

/**
 * Performs immediate local search filtering on static mock data.
 * Matches: worker name, category fields, and services offered by the category.
 */
export function performLocalSearch(query: string): SearchResults {
  const trimmed = query.trim();
  if (!trimmed) {
    return { categories: [], workers: [] };
  }

  const allCategories = getAllCategories();
  const allWorkers = getAllWorkers();

  // 1. Filter categories
  const matchedCategories = allCategories.filter((cat) => {
    // Check category name variations
    if (
      matchesQuery(cat.name, trimmed) ||
      matchesQuery(cat.titlePlural, trimmed) ||
      matchesQuery(cat.label, trimmed)
    ) {
      return true;
    }

    // Check service names listed for this category
    const services = servicesByCategory[cat.slug] || [];
    if (services.some((service) => matchesQuery(service, trimmed))) {
      return true;
    }

    return false;
  });

  // 2. Filter and score/rank workers to ensure relevance
  // Ranking:
  // - Score 100: Worker name directly matches query
  // - Score 50: Worker's category label or display matches query
  // - Score 25: A service under the worker's category matches query
  const scoredWorkers = allWorkers
    .map((worker) => {
      let score = 0;

      if (matchesQuery(worker.name, trimmed)) {
        score += 100;
      }

      if (
        matchesQuery(worker.categoryDisplay, trimmed) ||
        matchesQuery(worker.categoryLabel, trimmed)
      ) {
        score += 50;
      }

      const services = servicesByCategory[worker.categorySlug] || [];
      if (services.some((service) => matchesQuery(service, trimmed))) {
        score += 25;
      }

      return { worker, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.worker);

  return {
    categories: matchedCategories,
    workers: scoredWorkers,
  };
}
