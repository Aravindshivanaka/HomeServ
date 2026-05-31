import {
  BadgeCheck,
  Briefcase,
  Eye,
  Lock,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import Link from "next/link";

import { layout } from "@/lib/layout";
import type { Worker } from "@/types";
import { cn, sanitizePhoneNumber } from "@/lib/utils";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { SafeImage } from "@/components/ui/safe-image";

type WorkerListCardProps = {
  worker: Worker;
};

export function WorkerListCard({ worker }: WorkerListCardProps) {
  const locked = !worker.isUnlocked;

  return (
    <article
      className={cn(
        `relative ${layout.roundedCard} border bg-white p-3.5 ${layout.cardShadow}`,
        locked ? "border-[#E5E7EB] opacity-[0.98]" : "border-[#E5E7EB]"
      )}
    >
      <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-10">
        <span
          className={cn(
            "rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide",
            locked
              ? "bg-[#F3F4F6] text-[#6B7280]"
              : "bg-[#F97316] text-white"
          )}
        >
          {worker.categoryLabel}
        </span>
        <FavoriteButton workerId={worker.id} />
      </div>

      <div className="flex gap-2.5 pr-16">
        <div className="relative shrink-0">
          <SafeImage
            src={worker.imageUrl}
            alt=""
            width={56}
            height={56}
            className={cn(
              "size-14 rounded-full object-cover",
              locked && "opacity-90 grayscale-[0.15]"
            )}
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
          <h2 className="text-base font-semibold leading-5 text-[#111827]">
            {worker.name}
          </h2>
          <p className="mt-1 flex items-center gap-1 text-sm leading-5 text-[#6B7280]">
            <Star
              className={cn(
                "size-3.5 shrink-0",
                locked
                  ? "fill-[#D1D5DB] text-[#D1D5DB]"
                  : "fill-[#FACC15] text-[#FACC15]"
              )}
              aria-hidden
            />
            <span>
              {worker.rating}{" "}
              <span className="text-[#6B7280]">
                ({worker.reviewCount} reviews)
              </span>
            </span>
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-sm leading-5 text-[#6B7280]">
            <MapPin className="size-3.5 shrink-0 text-[#9CA3AF]" aria-hidden />
            <span>{worker.area}</span>
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs leading-4 text-[#6B7280]">
            <Briefcase className="size-3 shrink-0 text-[#9CA3AF]" aria-hidden />
            <span>{worker.yearsExperience} Yrs Exp</span>
          </p>
        </div>
      </div>

      {locked && worker.phoneMasked ? (
        <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-3 py-2.5">
          <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[#374151]">
            <Phone className="size-4 shrink-0 text-[#6B7280]" aria-hidden />
            <span className="tracking-wide">{worker.phoneMasked}</span>
          </p>
          <Lock
            className="size-[18px] shrink-0 text-[#6B7280]"
            strokeWidth={2.25}
            aria-hidden
          />
        </div>
      ) : null}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          href={`/worker/${worker.id}`}
          className={`inline-flex min-h-[48px] ${layout.touchBtn} items-center justify-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#111827] active:bg-[#F8FAFC]`}
        >
          <Eye className="size-4 shrink-0" aria-hidden />
          View Profile
        </Link>
        {locked ? (
          <Link
            href={`/worker/${worker.id}`}
            className={`inline-flex min-h-[48px] ${layout.touchBtn} items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] text-sm font-semibold text-white active:bg-[#1D4ED8]`}
          >
            <Eye className="size-4 shrink-0" aria-hidden />
            View Profile
          </Link>
        ) : (
          <a
            href={worker.phoneFull ? `tel:${sanitizePhoneNumber(worker.phoneFull)}` : undefined}
            className={`inline-flex min-h-[48px] ${layout.touchBtn} items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] text-sm font-semibold text-white active:bg-[#1D4ED8]`}
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            Call Now
          </a>
        )}
      </div>
    </article>
  );
}
