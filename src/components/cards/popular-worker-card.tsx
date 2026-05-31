import Image from "next/image";
import { BadgeCheck, Eye, Phone, Star } from "lucide-react";
import Link from "next/link";

import { layout } from "@/lib/layout";
import type { PopularWorker } from "@/types";
import { FavoriteButton } from "@/components/ui/favorite-button";

type PopularWorkerCardProps = {
  worker: PopularWorker;
};

export function PopularWorkerCard({ worker }: PopularWorkerCardProps) {
  return (
    <article
      className={`relative scroll-snap-item w-[calc(100vw-2.5rem)] max-w-[300px] shrink-0 ${layout.roundedCard} border border-[#E5E7EB] bg-white p-3.5 ${layout.cardShadow}`}
    >
      <FavoriteButton workerId={worker.id} className="absolute top-3 right-3 z-10" />
      <div className="flex gap-2.5 pr-8">
        <div className="relative shrink-0">
          <Image
            src={worker.imageUrl}
            alt=""
            width={56}
            height={56}
            className="size-14 rounded-full object-cover"
            loading="lazy"
            sizes="56px"
          />
          {worker.isVerified && (
            <span
              className="absolute -right-0.5 -bottom-0.5 flex size-[18px] items-center justify-center rounded-full bg-[#22C55E] text-white"
              aria-label="Verified worker"
            >
              <BadgeCheck className="size-3" strokeWidth={2.5} aria-hidden />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-start gap-1.5 gap-y-1">
            <h3 className="text-base font-semibold leading-5 text-[#111827]">
              {worker.name}
            </h3>
            <span className="rounded-md bg-[#FFEDD5] px-1.5 py-0.5 text-[11px] font-medium leading-4 text-[#9A3412]">
              {worker.category}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm leading-5 text-[#6B7280]">
            <Star
              className="size-3.5 shrink-0 fill-[#FACC15] text-[#FACC15]"
              aria-hidden
            />
            <span>
              {worker.rating}{" "}
              <span className="text-[#6B7280]">({worker.reviewCount} reviews)</span>
            </span>
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          href={`/worker/${worker.id}`}
          className={`inline-flex ${layout.touchBtn} items-center justify-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#111827] active:bg-[#F8FAFC]`}
        >
          <Eye className="size-4 shrink-0" aria-hidden />
          Profile
        </Link>
        <button
          type="button"
          className={`inline-flex ${layout.touchBtn} items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] text-sm font-semibold text-white active:bg-[#1D4ED8]`}
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          Call Now
        </button>
      </div>
    </article>
  );
}
