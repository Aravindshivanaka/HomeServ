import { supabase } from "@/lib/supabase";
import { getCategoryBySlug, getAllWorkers, getWorkersByCategory as getMockWorkersByCategory } from "@/data";
import { getWorkerById as getMockWorkerById } from "@/data/workers";
import { getReviewsByWorkerId, getFallbackReviews } from "@/data/reviews";
import { buildProfileDetails } from "@/data/workers/profile-details";
import type { Worker, PopularWorker } from "@/types/worker";
import type { WorkerProfile } from "@/types/worker-profile";

/** Maps a 10-digit or formatted phone number into the masked +91 XXXXX ***** standard */
export function formatMaskedPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const base = digits.length >= 10 ? digits.slice(-10) : digits;
  const prefix = base.slice(0, 5);
  return `+91 ${prefix} *****`;
}

/** Formats a phone number into the full +91 XXXXX XXXXX standard */
export function formatFullPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const base = digits.length >= 10 ? digits.slice(-10) : digits;
  const p1 = base.slice(0, 5);
  const p2 = base.slice(5);
  return `+91 ${p1} ${p2}`;
}

/** Fetch featured/popular workers for the Homepage carousel */
export async function fetchPopularWorkers(): Promise<PopularWorker[]> {
  try {
    const { data: catData, error: catError } = await supabase
      .from("categories")
      .select("id, slug");

    if (catError || !catData || catData.length === 0) {
      // Fallback to static mock popular workers if categories aren't configured
      const { getPopularWorkers } = await import("@/data");
      return getPopularWorkers();
    }

    const categoryMap = new Map<string, string>(catData.map((c: any) => [c.id, c.slug]));

    const { data: workersData, error: workersError } = await supabase
      .from("workers")
      .select("id, name, location, rating, verified, image_url, category_id, review_count")
      .eq("featured", true)
      .limit(6);

    if (workersError || !workersData || workersData.length === 0) {
      const { getPopularWorkers } = await import("@/data");
      return getPopularWorkers();
    }

    const categoryIds = Array.from(new Set(workersData.map((w: any) => w.category_id)));
    const firstTwoMap = new Map<string, string[]>();
    for (const catId of categoryIds) {
      if (!catId) continue;
      const { data: firstTwo } = await supabase
        .from("workers")
        .select("id")
        .eq("category_id", catId)
        .limit(2);
      if (firstTwo) {
        firstTwoMap.set(catId, firstTwo.map((item: any) => item.id));
      }
    }

    return workersData.map((w: any) => {
      const categorySlug = categoryMap.get(w.category_id) || "plumber";
      const mockCategory = getCategoryBySlug(categorySlug);
      
      const firstTwoIds = firstTwoMap.get(w.category_id) || [];
      const isUnlocked = firstTwoIds.includes(w.id);

      return {
        id: w.id,
        name: w.name,
        area: w.location || "Jagtial",
        rating: Number(w.rating || 0),
        reviewCount: Number(w.review_count || 0),
        isVerified: Boolean(w.verified),
        imageUrl: w.image_url || `/workers/${categorySlug}-1.svg`,
        category: mockCategory?.name ?? categorySlug,
        isUnlocked,
        phoneFull: isUnlocked ? "+91 98765 43210" : undefined,
      };
    });
  } catch (err) {
    console.error("Failed to fetch popular workers:", err);
    const { getPopularWorkers } = await import("@/data");
    return getPopularWorkers();
  }
}

/** Fetch workers filtered by category slug. First 2 workers in the array are unlocked by default. */
export async function fetchWorkersByCategory(categorySlug: string): Promise<Worker[]> {
  try {
    const { data: catData, error: catError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .maybeSingle();

    if (catError || !catData) {
      return getMockWorkersByCategory(categorySlug as any);
    }

    const { data: workersData, error: workersError } = await supabase
      .from("workers")
      .select("id, name, slug, category_id, location, experience, rating, verified, description, image_url, services, featured, review_count")
      .eq("category_id", catData.id);

    if (workersError || !workersData || workersData.length === 0) {
      return getMockWorkersByCategory(categorySlug as any);
    }

    const mockCategory = getCategoryBySlug(categorySlug);

    return workersData.map((w: any, index: number) => {
      const isUnlocked = index < 2; // Unlock first two by default

      return {
        id: w.id,
        name: w.name,
        categorySlug: categorySlug as any,
        categoryLabel: mockCategory?.label ?? categorySlug.toUpperCase(),
        categoryDisplay: mockCategory?.name ?? categorySlug,
        area: w.location || "Jagtial",
        rating: Number(w.rating || 0),
        reviewCount: Number(w.review_count || 0),
        yearsExperience: Number(w.experience || 5),
        isVerified: Boolean(w.verified),
        imageUrl: w.image_url || `/workers/${categorySlug}-1.svg`,
        isUnlocked,
        phoneMasked: "+91 XXXXX XXXXX",
        phoneFull: isUnlocked ? "+91 98765 43210" : undefined,
      };
    });
  } catch (err) {
    console.error(`Failed to fetch workers for category ${categorySlug}:`, err);
    return getMockWorkersByCategory(categorySlug as any);
  }
}

/** Fetch a single worker by ID from Supabase. Checks if worker is unlocked. */
export async function fetchWorkerById(workerId: string): Promise<Worker | null> {
  try {
    const { data: w, error } = await supabase
      .from("workers")
      .select("id, name, slug, category_id, location, experience, rating, verified, description, image_url, services, featured, review_count, categories:category_id(slug)")
      .eq("id", workerId)
      .maybeSingle();

    if (error || !w) {
      return getMockWorkerById(workerId) ?? null;
    }

    const categorySlug = (w.categories as any)?.slug || "plumber";
    const mockCategory = getCategoryBySlug(categorySlug);


    // Resolve lock status: Query first two workers of this category
    const { data: firstTwo } = await supabase
      .from("workers")
      .select("id")
      .eq("category_id", w.category_id)
      .limit(2);

    const isUnlocked = firstTwo?.some((item: any) => item.id === w.id) ?? false;

    return {
      id: w.id,
      name: w.name,
      categorySlug: categorySlug as any,
      categoryLabel: mockCategory?.label ?? categorySlug.toUpperCase(),
      categoryDisplay: mockCategory?.name ?? categorySlug,
      area: w.location || "Jagtial",
      rating: Number(w.rating || 0),
      reviewCount: Number(w.review_count || 0),
      yearsExperience: Number(w.experience || 5),
      isVerified: Boolean(w.verified),
      imageUrl: w.image_url || `/workers/${categorySlug}-1.svg`,
      isUnlocked,
      phoneMasked: "+91 XXXXX XXXXX",
      phoneFull: isUnlocked ? "+91 98765 43210" : undefined,
    };
  } catch (err) {
    console.error(`Failed to fetch worker by ID ${workerId}:`, err);
    return getMockWorkerById(workerId) ?? null;
  }
}

/** Fetch worker profile details & static mock review associations */
export async function fetchWorkerProfile(workerId: string): Promise<WorkerProfile | null> {
  const worker = await fetchWorkerById(workerId);
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

/** Fetches all workers in the database. Used client-side to build the local search index once on focus. */
export async function fetchAllWorkers(): Promise<Worker[]> {
  try {
    const { data: catData } = await supabase
      .from("categories")
      .select("id, slug");

    const categoryMap = new Map<string, string>(catData?.map((c: any) => [c.id, c.slug]) || []);

    const { data: workersData, error } = await supabase
      .from("workers")
      .select("id, name, slug, category_id, location, experience, rating, verified, description, image_url, services, featured, review_count");

    if (error || !workersData || workersData.length === 0) {
      return getAllWorkers();
    }

    const workersCountByCategory = new Map<string, number>();

    return workersData.map((w: any) => {
      const categorySlug = categoryMap.get(w.category_id) || "plumber";
      const mockCategory = getCategoryBySlug(categorySlug);

      const count = workersCountByCategory.get(categorySlug) || 0;
      const isUnlocked = count < 2;
      workersCountByCategory.set(categorySlug, count + 1);

      return {
        id: w.id,
        name: w.name,
        categorySlug: categorySlug as any,
        categoryLabel: mockCategory?.label ?? categorySlug.toUpperCase(),
        categoryDisplay: mockCategory?.name ?? categorySlug,
        area: w.location || "Jagtial",
        rating: Number(w.rating || 0),
        reviewCount: Number(w.review_count || 0),
        yearsExperience: Number(w.experience || 5),
        isVerified: Boolean(w.verified),
        imageUrl: w.image_url || `/workers/${categorySlug}-1.svg`,
        isUnlocked,
        phoneMasked: "+91 XXXXX XXXXX",
        phoneFull: isUnlocked ? "+91 98765 43210" : undefined,
      };
    });
  } catch (err) {
    console.error("Failed to fetch all workers:", err);
    return getAllWorkers();
  }
}
