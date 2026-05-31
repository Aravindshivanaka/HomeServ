import { supabase } from "@/lib/supabase";

export type AdminWorkerRow = {
  id: string;
  name: string;
  slug: string;
  phone: string;
  category_id: string;
  location: string;
  experience: number;
  rating: number;
  verified: boolean;
  description: string;
  image_url: string;
  services: string;
  featured: boolean;
  category_name?: string;
};

export type WorkerFormData = {
  name: string;
  phone: string;
  category_id: string;
  location: string;
  experience: number;
  services: string;
  description: string;
  image_url: string;
  featured: boolean;
  verified: boolean;
};

function parseServices(servicesStr: string): string[] {
  if (!servicesStr || !servicesStr.trim()) return [];
  return servicesStr
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function formatServices(servicesVal: any): string {
  if (!servicesVal) return "";
  if (Array.isArray(servicesVal)) {
    return servicesVal.join(", ");
  }
  if (typeof servicesVal === "string") {
    return servicesVal;
  }
  return "";
}

/** Fetch all workers with their category name for the admin list */
export async function getAdminWorkers(): Promise<AdminWorkerRow[]> {
  const { data, error } = await supabase
    .from("workers")
    .select("*, categories:category_id(name)")
    .order("name");

  if (error || !data) {
    console.error("Admin: failed to fetch workers", error);
    return [];
  }

  return data.map((w: any) => ({
    id: w.id,
    name: w.name,
    slug: w.slug,
    phone: w.phone || "",
    category_id: w.category_id,
    location: w.location || "",
    experience: w.experience || 0,
    rating: w.rating || 0,
    verified: Boolean(w.verified),
    description: w.description || "",
    image_url: w.image_url || "",
    services: formatServices(w.services),
    featured: Boolean(w.featured),
    category_name: w.categories?.name || "Unknown",
  }));
}

/** Fetch a single worker by ID for the edit form */
export async function getAdminWorkerById(id: string): Promise<AdminWorkerRow | null> {
  const { data, error } = await supabase
    .from("workers")
    .select("*, categories:category_id(name)")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    phone: data.phone || "",
    category_id: data.category_id,
    location: data.location || "",
    experience: data.experience || 0,
    rating: data.rating || 0,
    verified: Boolean(data.verified),
    description: data.description || "",
    image_url: data.image_url || "",
    services: formatServices(data.services),
    featured: Boolean(data.featured),
    category_name: data.categories?.name || "Unknown",
  };
}

/** Fetch all categories for the category dropdown */
export async function getAdminCategories(): Promise<{ id: string; name: string }[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  if (error || !data) return [];
  return data;
}

/** Generate a URL-friendly slug from a worker name */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Create a new worker */
export async function createWorker(form: WorkerFormData): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("workers").insert({
    name: form.name.trim(),
    slug: toSlug(form.name),
    phone: form.phone.trim(),
    category_id: form.category_id,
    location: form.location.trim(),
    experience: form.experience,
    services: parseServices(form.services),
    description: form.description.trim(),
    image_url: form.image_url.trim(),
    featured: form.featured,
    verified: form.verified,
    rating: 4.5,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/** Update an existing worker */
export async function updateWorker(id: string, form: WorkerFormData): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("workers")
    .update({
      name: form.name.trim(),
      slug: toSlug(form.name),
      phone: form.phone.trim(),
      category_id: form.category_id,
      location: form.location.trim(),
      experience: form.experience,
      services: parseServices(form.services),
      description: form.description.trim(),
      image_url: form.image_url.trim(),
      featured: form.featured,
      verified: form.verified,
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/** Delete a worker */
export async function deleteWorker(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("workers").delete().eq("id", id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
