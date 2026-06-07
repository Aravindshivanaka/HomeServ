import { createClient } from "@supabase/supabase-js";
import { PopularWorker } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials are not fully configured in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchPopularWorkers(): Promise<PopularWorker[]> {
  try {
    const { data: catData, error: catError } = await supabase
      .from("categories")
      .select("id, slug, name");

    if (catError || !catData || catData.length === 0) {
      return [];
    }

    const categoryMap = new Map<string, { slug: string; name: string }>(
      catData.map((c: any) => [c.id, { slug: c.slug, name: c.name }])
    );

    const { data: workersData, error: workersError } = await supabase
      .from("workers")
      .select("id, name, phone, location, rating, verified, image_url, category_id, is_free_visible")
      .eq("featured", true)
      .order("rating", { ascending: false })
      .limit(8);

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
        category: category?.name ?? categorySlug,
        isUnlocked,
        phoneFull: isUnlocked && w.phone ? w.phone : undefined,
      };
    });
  } catch (err) {
    console.error("Failed to fetch popular workers:", err);
    return [];
  }
}
