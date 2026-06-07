import { supabase } from "@/lib/supabase";
import type { Worker, PopularWorker } from "@/types/worker";
import type { WorkerProfile, WorkerProfileDetails } from "@/types/worker-profile";

type CategoryInfo = {
  slug: string;
  name?: string | null;
};

type WorkerWithDetails = Worker & {
  description?: string | null;
  services?: unknown;
};

function formatCategoryDisplay(slug: string, name?: string | null): string {
  if (name?.trim()) return name;
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatCategoryLabel(slug: string): string {
  return slug.replace(/-/g, " ").toUpperCase();
}

function normalizeServices(services: unknown): string[] {
  if (Array.isArray(services)) {
    return services.filter((service): service is string => typeof service === "string" && service.trim().length > 0);
  }

  if (typeof services === "string" && services.trim().length > 0) {
    try {
      const parsed = JSON.parse(services);
      if (Array.isArray(parsed)) {
        return parsed.filter((service): service is string => typeof service === "string" && service.trim().length > 0);
      }
    } catch {
      return services
        .split(",")
        .map((service) => service.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function buildProfileDetailsFromWorker(worker: Worker): WorkerProfileDetails {
  const detailedWorker = worker as WorkerWithDetails;

  return {
    about: detailedWorker.description?.trim() || "",
    services: normalizeServices(detailedWorker.services).slice(0, 4),
    gallery: [],
    galleryMoreCount: 0,
    phoneFull: worker.phoneFull,
  };
}

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
      .select("id, slug, name");

    if (catError || !catData || catData.length === 0) {
      return [];
    }

    const categoryMap = new Map<string, CategoryInfo>(
      catData.map((c: any) => [c.id, { slug: c.slug, name: c.name }])
    );

    const { data: workersData, error: workersError } = await supabase
      .from("workers")
      .select("id, name, phone, location, rating, verified, image_url, category_id, is_free_visible")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(50);

    if (workersError || !workersData || workersData.length === 0) {
      return [];
    }

    return workersData.map((w: any) => {
      const category = categoryMap.get(w.category_id);
      const categorySlug = category?.slug || "worker";
      const isUnlocked = w.is_free_visible === true;

      return {
        id: w.id,
        name: w.name,
        area: w.location || "Jagtial",
        rating: Number(w.rating || 0),
        reviewCount: w.rating ? Math.round(Number(w.rating) * 15) : 25,
        isVerified: Boolean(w.verified),
        imageUrl: w.image_url || "",
        category: formatCategoryDisplay(categorySlug, category?.name),
        isUnlocked,
        phoneFull: isUnlocked && w.phone ? formatFullPhone(w.phone) : undefined,
      };
    });
  } catch (error) {
    return [];
  }
}

/** Fetch workers filtered by category slug. First 2 workers in the array are unlocked by default. */
export async function fetchWorkersByCategory(categorySlug: string): Promise<Worker[]> {
  try {
    const { data: catData, error: catError } = await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("slug", categorySlug)
      .maybeSingle();

    if (catError || !catData) {
      return [];
    }

    const { data: workersData, error: workersError } = await supabase
      .from("workers")
      .select("id, name, slug, phone, category_id, location, experience, rating, verified, description, image_url, services, featured, is_free_visible")
      .eq("category_id", catData.id)
      .order("is_free_visible", { ascending: false })
      .order("name");

    if (workersError || !workersData || workersData.length === 0) {
      return [];
    }

    const categoryDisplay = formatCategoryDisplay(catData.slug, catData.name);
    const categoryLabel = formatCategoryLabel(catData.slug);

    return workersData.map((w: any) => {
      const isUnlocked = w.is_free_visible === true;

      return {
        id: w.id,
        name: w.name,
        categorySlug: categorySlug as any,
        categoryLabel,
        categoryDisplay,
        area: w.location || "Jagtial",
        rating: Number(w.rating || 0),
        reviewCount: w.rating ? Math.round(Number(w.rating) * 15) : 25,
        yearsExperience: Number(w.experience || 5),
        isVerified: Boolean(w.verified),
        imageUrl: w.image_url || "",
        isUnlocked,
        phoneMasked: isUnlocked && w.phone ? formatMaskedPhone(w.phone) : "+91 XXXXX XXXXX",
        phoneFull: isUnlocked && w.phone ? formatFullPhone(w.phone) : undefined,
        description: w.description,
        services: w.services,
      };
    });
  } catch (error) {
    return [];
  }
}

/** Fetch a single worker by ID from Supabase. Checks if worker is unlocked. */
export async function fetchWorkerById(workerId: string): Promise<Worker | null> {
  try {
    const { data: w, error } = await supabase
      .from("workers")
      .select("id, name, slug, phone, category_id, location, experience, rating, verified, description, image_url, services, featured, is_free_visible, categories:category_id(slug, name)")
      .eq("id", workerId)
      .maybeSingle();

    if (error || !w) {
      return null;
    }

    const categorySlug = (w.categories as any)?.slug || "plumber";
    const categoryName = (w.categories as any)?.name;

    const isUnlocked = w.is_free_visible === true;

    return {
      id: w.id,
      name: w.name,
      categorySlug: categorySlug as any,
      categoryLabel: formatCategoryLabel(categorySlug),
      categoryDisplay: formatCategoryDisplay(categorySlug, categoryName),
      area: w.location || "Jagtial",
      rating: Number(w.rating || 0),
      reviewCount: w.rating ? Math.round(Number(w.rating) * 15) : 25,
      yearsExperience: Number(w.experience || 5),
      isVerified: Boolean(w.verified),
      imageUrl: w.image_url || "",
      isUnlocked,
      phoneMasked: isUnlocked && w.phone ? formatMaskedPhone(w.phone) : "+91 XXXXX XXXXX",
      phoneFull: isUnlocked && w.phone ? formatFullPhone(w.phone) : undefined,
      description: w.description,
      services: w.services,
    } as WorkerWithDetails;
  } catch (err) {
    console.error(`Failed to fetch worker by ID ${workerId}:`, err);
    return null;
  }
}

/** Fetch worker profile details from the Supabase worker row only. */
export async function fetchWorkerProfile(workerId: string): Promise<WorkerProfile | null> {
  const worker = await fetchWorkerById(workerId);
  if (!worker) return null;

  return {
    worker,
    details: buildProfileDetailsFromWorker(worker),
    reviews: [],
  };
}

/** Fetches all workers in the database. Used client-side to build the local search index once on focus. */
export async function fetchAllWorkers(): Promise<Worker[]> {
  try {
    const { data: catData } = await supabase
      .from("categories")
      .select("id, slug, name");

    const categoryMap = new Map<string, CategoryInfo>(
      catData?.map((c: any) => [c.id, { slug: c.slug, name: c.name }]) || []
    );

    const { data: workersData, error } = await supabase
      .from("workers")
      .select("id, name, slug, phone, category_id, location, experience, rating, verified, description, image_url, services, featured, is_free_visible");

    if (error || !workersData || workersData.length === 0) {
      return [];
    }

    return workersData.map((w: any) => {
      const category = categoryMap.get(w.category_id);
      const categorySlug = category?.slug || "worker";
      const isUnlocked = w.is_free_visible === true;

      return {
        id: w.id,
        name: w.name,
        categorySlug: categorySlug as any,
        categoryLabel: formatCategoryLabel(categorySlug),
        categoryDisplay: formatCategoryDisplay(categorySlug, category?.name),
        area: w.location || "Jagtial",
        rating: Number(w.rating || 0),
        reviewCount: w.rating ? Math.round(Number(w.rating) * 15) : 25,
        yearsExperience: Number(w.experience || 5),
        isVerified: Boolean(w.verified),
        imageUrl: w.image_url || "",
        isUnlocked,
        phoneMasked: isUnlocked && w.phone ? formatMaskedPhone(w.phone) : "+91 XXXXX XXXXX",
        phoneFull: isUnlocked && w.phone ? formatFullPhone(w.phone) : undefined,
        description: w.description,
        services: w.services,
      };
    });
  } catch (err) {
    console.error("Failed to fetch all workers:", err);
    return [];
  }
}
