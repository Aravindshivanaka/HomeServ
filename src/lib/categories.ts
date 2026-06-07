import { supabase } from "@/lib/supabase";
import type { Category } from "@/types";

const CATEGORY_SLUGS = [
  "plumber",
  "ac-repair",
  "carpenter",
  "electrician",
  "auto-rental",
  "welder",
  "car-rental",
  "painter",
  "mason",
];

function toCategory(item: any, workerCount: number = 0): Category {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    icon: item.icon || "wrench",
    titlePlural: `${item.name}s`,
    label: item.slug.toUpperCase(),
    workerCount,
    iconBg: "#DBEAFE",
    iconColor: "#2563EB",
  };
}

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, icon, workers(count)")
    .order("name");

  if (error || !data) return [];
  return data.map((item: any) => {
    const count = item.workers?.[0]?.count || 0;
    return toCategory(item, count);
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, icon")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return toCategory(data);
}

export function getCategorySlugs(): string[] {
  return CATEGORY_SLUGS;
}

export function isValidCategorySlug(slug: string): boolean {
  return getCategorySlugs().includes(slug);
}

export async function fetchCategories(): Promise<Category[]> {
  return getAllCategories();
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  return getCategoryBySlug(slug);
}
