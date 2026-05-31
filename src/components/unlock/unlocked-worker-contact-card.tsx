import Image from "next/image";
import { BadgeCheck, Eye, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";

import { layout } from "@/lib/layout";
import type { Worker } from "@/types";
import { buildProfileDetails } from "@/data/workers/profile-details";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { cn } from "@/lib/utils";

type UnlockedWorkerContactCardProps = {
  worker: Worker;
};

export function UnlockedWorkerContactCard({
  worker,
}: UnlockedWorkerContactCardProps) {
  const details = buildProfileDetails(worker);
  const phoneNumber = details.phoneFull;

  return (
    <article
      className={`relative ${layout.roundedCard} border border-[#E5E7EB] bg-white p-3.5 ${layout.cardShadow}`}
    >
      <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-10">
        <span
          className="rounded-md bg-[#F97316] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase"
        >
          {worker.categoryLabel}
        </span>
        <FavoriteButton workerId={worker.id} />
      </div>
      
      <div className="flex gap-2.5 pr-16">
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
              <BadgeCheck
                className="size-3"
                strokeWidth={2.5}
                aria-hidden
              />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-base font-semibold leading-5 text-[#111827]">
            {worker.name}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm leading-5 text-[#6B7280]">
            <Star
              className="size-3.5 shrink-0 fill-[#FACC15] text-[#FACC15]"
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
            <MapPin
              className="size-3.5 shrink-0 text-[#9CA3AF]"
              aria-hidden
            />
            <span>{worker.area}</span>
          </p>
        </div>
      </div>

      {/* Phone number — always visible for unlocked workers */}
      {phoneNumber ? (
        <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#EFF6FF] px-3 py-2.5">
          <Phone
            className="size-4 shrink-0 text-[#2563EB]"
            aria-hidden
          />
          <a
            href={`tel:${phoneNumber.replace(/\s/g, "")}`}
            className="text-sm font-semibold tracking-wide text-[#111827]"
          >
            {phoneNumber}
          </a>
        </div>
      ) : null}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          href={`/worker/${worker.id}`}
          className={`inline-flex ${layout.touchBtn} items-center justify-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#111827] active:bg-[#F8FAFC]`}
        >
          <Eye className="size-4 shrink-0" aria-hidden />
          Profile
        </Link>
        <a
          href={
            phoneNumber
              ? `tel:${phoneNumber.replace(/\s/g, "")}`
              : undefined
          }
          className={`inline-flex ${layout.touchBtn} items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] text-sm font-semibold text-white active:bg-[#1D4ED8]`}
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          Call Now
        </a>
      </div>
    </article>
  );
}
