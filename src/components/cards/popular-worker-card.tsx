"use client";

import { BadgeCheck, Star } from "lucide-react";
import Link from "next/link";

import type { PopularWorker } from "@/types";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { SafeImage } from "@/components/ui/safe-image";

type PopularWorkerCardProps = {
  worker: PopularWorker;
};

export function PopularWorkerCard({ worker }: PopularWorkerCardProps) {
  const categorySlug = worker.category ? worker.category.toLowerCase().replace(/\s+/g, "-") : "plumber";
  const fallbackPhoto = `/workers/${categorySlug}-1.svg`;

  return (
    <article
      className="relative w-[160px] max-w-[160px] shrink-0 bg-white border border-[#E5E7EB] rounded-2xl p-3 flex flex-col justify-between shadow-[0px_2px_8px_rgba(17,24,39,0.03)] snap-start hover:shadow-[0px_4px_12px_rgba(17,24,39,0.06)] transition-all duration-200"
    >
      {/* Heart Wishlist Button */}
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton workerId={worker.id} className="size-7" />
      </div>

      {/* Photo & Info Container */}
      <div className="flex flex-col items-center text-center">
        {/* Photo */}
        <div className="relative size-14 shrink-0 bg-gray-100 rounded-full overflow-hidden">
          <SafeImage
            src={worker.imageUrl || fallbackPhoto}
            alt={worker.name}
            width={56}
            height={56}
            className="rounded-full object-cover border border-gray-50 size-14"
            fallbackSrc={fallbackPhoto}
          />
          {worker.isVerified && (
            <span
              className="absolute -right-0.5 -bottom-0.5 flex size-4 items-center justify-center rounded-full bg-[#10B981] text-white border border-white shadow-xs"
              aria-label="Verified worker"
            >
              <BadgeCheck className="size-3" strokeWidth={2.5} />
            </span>
          )}
        </div>

        {/* Worker Name */}
        <h4 className="mt-2 text-xs font-bold text-[#111827] truncate w-full px-1">
          {worker.name}
        </h4>

        {/* Category Badge */}
        <span className="mt-1 inline-flex px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-[#EFF6FF] text-[#1E40AF] truncate max-w-full">
          {worker.category || "Worker"}
        </span>

        {/* Rating */}
        <div className="mt-1.5 flex items-center justify-center text-[10px] text-[#6B7280]">
          <Star className="size-3 text-[#F59E0B] fill-[#F59E0B] mr-0.5" />
          <span className="font-semibold text-gray-900">{worker.rating ? worker.rating.toFixed(1) : "0.0"}</span>
          <span className="mx-1 text-gray-300">•</span>
          <span>({worker.reviewCount || 0})</span>
        </div>
      </div>

      {/* View Profile Button */}
      <div className="mt-3">
        <Link
          href={`/worker/${worker.id}`}
          className="flex h-8 items-center justify-center rounded-lg border border-[#2563EB] text-[11px] font-bold text-[#2563EB] bg-white hover:bg-blue-50 active:bg-blue-100 transition-colors w-full"
        >
          View Profile
        </Link>
      </div>
    </article>
  );
}
