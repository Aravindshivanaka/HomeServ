import { Clock, Phone, Users } from "lucide-react";
import Link from "next/link";

import { getCategoryIcon } from "@/lib/category-icons";
import { getCategoryBySlug } from "@/data/categories";
import { layout } from "@/lib/layout";
import type { UserUnlock } from "@/types";

type ActiveUnlockCardProps = {
  unlock: UserUnlock;
};

export function ActiveUnlockCard({ unlock }: ActiveUnlockCardProps) {
  const category = getCategoryBySlug(unlock.categorySlug);
  const Icon = category ? getCategoryIcon(category.icon) : null;

  const expiryText =
    unlock.daysRemaining > 0
      ? `${unlock.daysRemaining}d ${unlock.hoursRemaining}h remaining`
      : `${unlock.hoursRemaining}h remaining`;

  return (
    <Link
      href={`/category/${unlock.categorySlug}`}
      className={`block ${layout.roundedCard} border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 ${layout.cardShadow} active:bg-[#DBEAFE]`}
    >
      <div className="flex items-center gap-3">
        {Icon && category ? (
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: category.iconBg }}
          >
            <Icon
              className="size-5"
              style={{ color: category.iconColor }}
              aria-hidden
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold leading-5 text-[#111827]">
              {unlock.categoryName}
            </h3>
            <span className="rounded-md bg-[#22C55E] px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">
              Active
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs leading-4 text-[#374151]">
            <span className="flex items-center gap-1">
              <Clock className="size-3 shrink-0 text-[#6B7280]" aria-hidden />
              {expiryText}
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-3 shrink-0 text-[#6B7280]" aria-hidden />
              {unlock.unlockedWorkerCount} contacts
            </span>
          </div>
        </div>
        <Phone
          className="size-5 shrink-0 text-[#2563EB]"
          aria-hidden
        />
      </div>
    </Link>
  );
}
