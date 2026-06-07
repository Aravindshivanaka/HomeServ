import { BadgeCheck, Briefcase, MapPin, Star } from "lucide-react";

import { layout } from "@/lib/layout";
import type { Worker } from "@/types";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { SafeImage } from "@/components/ui/safe-image";

type ProfileHeroCardProps = {
  worker: Worker;
};

export function ProfileHeroCard({ worker }: ProfileHeroCardProps) {
  return (
    <section
      className={`relative ${layout.roundedCard} border border-[#E5E7EB] bg-white p-3.5 ${layout.cardShadow}`}
    >
      <FavoriteButton workerId={worker.id} className="absolute top-3.5 right-3.5 z-10" />
      <div className="flex gap-3 pr-8">
        <div className="relative shrink-0">
          <SafeImage
            src={worker.imageUrl}
            alt=""
            width={80}
            height={80}
            className="size-20 rounded-xl object-cover"
            fallbackText={worker.name}
            priority
            sizes="80px"
          />
          {worker.isVerified && (
            <span
              className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-[#22C55E] text-white"
              aria-label="Verified worker"
            >
              <BadgeCheck className="size-3.5" strokeWidth={2.5} aria-hidden />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start gap-2">
            <h1 className="text-lg font-semibold leading-6 text-[#111827]">
              {worker.name}
            </h1>
            {worker.isVerified && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#DCFCE7] px-2 py-0.5 text-xs font-medium text-[#15803D]">
                <BadgeCheck className="size-3.5" aria-hidden />
                Verified
              </span>
            )}
          </div>
          <span className="mt-1.5 inline-block rounded-md bg-[#FFEDD5] px-2 py-0.5 text-xs font-medium text-[#9A3412]">
            {worker.categoryDisplay}
          </span>
          <p className="mt-1.5 text-sm text-[#6B7280]">
            {worker.categoryDisplay} • {worker.yearsExperience} Years Exp.
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm text-[#6B7280]">
            <MapPin className="size-3.5 shrink-0 text-[#9CA3AF]" aria-hidden />
            <span>{worker.area}, Jagtial District</span>
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm text-[#6B7280]">
            {!worker.rating || worker.rating === 0 ? (
              <span className="text-xs text-[#6B7280] italic">No reviews yet</span>
            ) : (
              <>
                <Star
                  className="size-3.5 shrink-0 fill-[#FACC15] text-[#FACC15]"
                  aria-hidden
                />
                <span>
                  {worker.rating.toFixed(1)}{" "}
                  <span className="text-[#6B7280]">
                    ({worker.reviewCount} Reviews)
                  </span>
                </span>
              </>
            )}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-[#6B7280]">
            <Briefcase className="size-3 shrink-0 text-[#9CA3AF]" aria-hidden />
            <span>{worker.yearsExperience} years local experience</span>
          </p>
        </div>
      </div>
    </section>
  );
}
