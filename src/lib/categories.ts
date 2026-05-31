import { supabase } from "@/lib/supabase";
import {
  getAllCategorySlugs,
  getCategoryListing,
  isValidCategorySlug,
  getCategoryBySlug,
  categories as mockCategories,
} from "@/data";
import type { Category } from "@/types";

export function getCategorySlugs(): string[] {
  return getAllCategorySlugs();
}

export function getCategoryListingBySlug(slug: string) {
  return getCategoryListing(slug);
}

export { isValidCategorySlug };

/**
 * Fetch all categories from Supabase 'categories' table.
 * If empty or error occurs, gracefully falls back to mock categories data.
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, icon");

    if (error) {
      console.error("Error fetching categories from Supabase:", error);
      return mockCategories;
    }

    if (!data || data.length === 0) {
      console.log("Supabase categories table is empty. Falling back to mock categories.");
      return mockCategories;
    }

    return data.map((item) => {
      const mockVisuals = getCategoryBySlug(item.slug);
      return {
        id: item.id,
        slug: item.slug as any,
        name: item.name,
        titlePlural: mockVisuals?.titlePlural ?? `${item.name}s`,
        label: mockVisuals?.label ?? item.slug.toUpperCase(),
        workerCount: mockVisuals?.workerCount ?? 0,
        icon: (item.icon || mockVisuals?.icon || "wrench") as any,
        iconBg: mockVisuals?.iconBg ?? "#DBEAFE",
        iconColor: mockVisuals?.iconColor ?? "#2563EB",
      };
    });
  } catch (err) {
    console.error("Failed to fetch categories from Supabase:", err);
    return mockCategories;
  }
}

/**
 * Fetch a single category by slug from Supabase.
 * Falls back to mock category if not found or database fails.
 */
export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, icon")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      if (error) {
        console.error(`Error fetching category ${slug} from Supabase:`, error);
      }
      return getCategoryBySlug(slug) ?? null;
    }

    const mockVisuals = getCategoryBySlug(data.slug);
    return {
      id: data.id,
      slug: data.slug as any,
      name: data.name,
      titlePlural: mockVisuals?.titlePlural ?? `${data.name}s`,
      label: mockVisuals?.label ?? data.slug.toUpperCase(),
      workerCount: mockVisuals?.workerCount ?? 0,
      icon: (data.icon || mockVisuals?.icon || "wrench") as any,
      iconBg: mockVisuals?.iconBg ?? "#DBEAFE",
      iconColor: mockVisuals?.iconColor ?? "#2563EB",
    };
  } catch (err) {
    console.error(`Failed to fetch category by slug ${slug}:`, err);
    return getCategoryBySlug(slug) ?? null;
  }
}
