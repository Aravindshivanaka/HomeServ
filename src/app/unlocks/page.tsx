"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { useWishlist } from "@/lib/wishlist-context";
import { supabase } from "@/lib/supabase";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    if (wishlist.length > 0) {
      supabase.from("workers").select("id, name, location, experience, categories:category_id(name)").in("id", wishlist)
        .then(({ data }) => data && setWorkers(data));
    } else setWorkers([]);
  }, [wishlist]);

  return (
    <MobileShell>
      <main className="p-4 space-y-4">
        <h1 className="text-xl font-bold">Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10 space-y-3">
            <Heart className="size-12 text-gray-300" />
            <h2 className="text-lg font-semibold">No saved workers yet</h2>
            <p className="text-sm text-gray-500 max-w-xs">Tap the heart icon on any worker to save them here</p>
            <Link href="/categories" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm">Browse Workers</Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {workers.map(w => (
              <div key={w.id} className="p-3 border rounded-xl bg-white shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-base">{w.name}</h3>
                  <p className="text-xs text-gray-500">{(w.categories as any)?.name || "Worker"} • {w.location} • {w.experience} Yrs Exp</p>
                </div>
                <Link href={`/worker/${w.id}`} className="px-4 py-2 border rounded-xl text-sm font-semibold hover:bg-gray-50">View Profile</Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </MobileShell>
  );
}
