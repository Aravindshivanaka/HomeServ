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
      .select("id, slug");

    if (catError || !catData || catData.length === 0) {
      return [];
    }

    const categoryMap = new Map<string, string>(catData.map((c: any) => [c.id, c.slug]));

    const { data: workersData, error: workersError } = await supabase
      .from("workers")
      .select("id, name, location, rating, verified, image_url, category_id")
      .eq("featured", true)
      .order("rating", { ascending: false })
      .limit(8);

    if (workersError || !workersData || workersData.length === 0) {
      return [];
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

    const { getCategoryBySlug } = await import("@/data");

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
        reviewCount: w.rating ? Math.round(Number(w.rating) * 15) : 25,
        isVerified: Boolean(w.verified),
        imageUrl: w.image_url || `/workers/${categorySlug}-1.svg`,
        category: mockCategory?.name ?? categorySlug,
        isUnlocked,
        phoneFull: isUnlocked ? "+91 98765 43210" : undefined,
      };
    });
  } catch (err) {
    console.error("Failed to fetch popular workers:", err);
    return [];
  }
}
