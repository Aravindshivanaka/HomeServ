"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, MapPin, BadgeCheck, Briefcase } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { supabase } from "@/lib/supabase";
import { SafeImage } from "@/components/ui/safe-image";

export default function FeaturedWorkersPage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from("workers")
          .select(`
            id,
            name,
            location,
            experience,
            verified,
            rating,
            review_count,
            image_url,
            category_id,
            categories:category_id (
              name,
              slug
            )
          `)
          .eq("featured", true);

        if (!error && data) {
          setWorkers(data);
        } else {
          setWorkers([]);
        }
      } catch (err) {
        console.error("Failed to fetch featured workers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <MobileShell>
      <main className="p-4 space-y-4 pb-24">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Featured Workers</h1>
          <p className="text-sm text-gray-500 mt-1">Hand-picked by ServeHome</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="size-8 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 font-medium">Loading featured workers...</p>
          </div>
        ) : workers.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 space-y-3 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">No featured workers yet</h2>
            <p className="text-sm text-gray-500 max-w-xs mt-1">
              Check back later for hand-picked, verified professionals.
            </p>
            <Link
              href="/categories"
              className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-semibold text-sm shadow-sm active:scale-95 transition-all"
            >
              Browse Categories
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {workers.map((w) => {
              const categoryObj = w.categories as any;
              const categoryName = categoryObj?.name || "Worker";

              return (
                <div
                  key={w.id}
                  className="relative flex flex-col gap-3.5 p-4 border border-[#E5E7EB] bg-white rounded-2xl shadow-[0px_2px_8px_rgba(17,24,39,0.04)] hover:shadow-[0px_4px_12px_rgba(17,24,39,0.08)] transition-all duration-200"
                >
                  <div className="flex gap-4 items-start">
                    <div className="relative size-16 shrink-0 bg-gray-100 rounded-full overflow-hidden">
                      <SafeImage
                        src={w.image_url}
                        alt={w.name}
                        width={64}
                        height={64}
                        className="rounded-full object-cover border border-[#F3F4F6] size-16"
                        fallbackText={w.name}
                      />
                      {w.verified && (
                        <span
                          className="absolute bottom-0 right-0 flex size-5 items-center justify-center rounded-full bg-[#10B981] text-white border-2 border-white shadow-sm"
                          aria-label="Verified worker"
                        >
                          <BadgeCheck className="size-3.5" strokeWidth={2.5} />
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-[#111827] truncate pr-2">
                        {w.name}
                      </h3>

                      <div className="flex flex-wrap gap-2 mt-1.5 items-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-[#EFF6FF] text-[#1E40AF]">
                          {categoryName}
                        </span>
                        <span className="inline-flex items-center text-xs text-[#6B7280]">
                          <MapPin className="size-3.5 text-[#9CA3AF] mr-0.5" />
                          {w.location || "Jagtial"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-2 text-xs text-[#6B7280]">
                        <span className="flex items-center text-[#F59E0B]">
                          <Star className="size-3.5 fill-current mr-0.5" />
                          {w.rating ? Number(w.rating).toFixed(1) : "0.0"} ({w.review_count || 0})
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Briefcase className="size-3.5 text-[#9CA3AF] mr-1" />
                          {w.experience || 0} Yrs Exp
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F3F4F6] flex justify-end">
                    <Link
                      href={`/worker/${w.id}`}
                      className="inline-flex h-10 px-4 items-center justify-center rounded-xl border border-[#2563EB] text-sm font-semibold text-[#2563EB] bg-white hover:bg-blue-50 active:bg-blue-100 transition-colors w-full sm:w-auto"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </MobileShell>
  );
}
