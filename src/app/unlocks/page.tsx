"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { supabase } from "@/lib/supabase";
import { SafeImage } from "@/components/ui/safe-image";

export default function WishlistPage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      let ids: string[] = [];
      const saved = localStorage.getItem("servehome-wishlist");
      if (saved) {
        try {
          ids = JSON.parse(saved);
        } catch {}
      }

      if (ids.length > 0) {
        const uuidIds = ids.filter(id => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id));

        if (uuidIds.length > 0) {
          const { data, error } = await supabase
            .from("workers")
            .select("id, name, location, experience, image_url, categories:category_id(name, slug)")
            .in("id", uuidIds);
          if (!error && data) {
            setWorkers(data.map(w => ({
              id: w.id,
              name: w.name,
              location: w.location,
              experience: w.experience,
              imageUrl: w.image_url || "",
              categoryName: (w.categories as any)?.name || "Worker",
            })));
          } else {
            setWorkers([]);
          }
        } else {
          setWorkers([]);
        }
      } else {
        setWorkers([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener("focus", loadWishlist);
    return () => {
      window.removeEventListener("focus", loadWishlist);
    };
  }, []);

  return (
    <MobileShell>
      <main className="p-4 space-y-4">
        <h1 className="text-xl font-bold">Wishlist</h1>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : workers.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10 space-y-3">
            <Heart className="size-12 text-gray-300" />
            <h2 className="text-lg font-semibold">No saved workers yet</h2>
            <p className="text-sm text-gray-500 max-w-xs">Tap the heart icon on any worker to save them here</p>
            <Link href="/categories" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm">Browse Workers</Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {workers.map((w) => (
              <div key={w.id} className="p-3 border rounded-xl bg-white shadow-sm flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0">
                    <SafeImage
                      src={w.imageUrl}
                      alt={w.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover size-12 border border-gray-100"
                      fallbackText={w.name}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base leading-5">{w.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {w.categoryName} • {w.location || "Jagtial"}
                    </p>
                  </div>
                </div>
                <Link href={`/worker/${w.id}`} className="px-4 py-2 border rounded-xl text-sm font-semibold hover:bg-gray-50 shrink-0">
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </MobileShell>
  );
}
