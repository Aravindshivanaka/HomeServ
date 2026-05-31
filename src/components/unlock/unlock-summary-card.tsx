import { Calendar } from "lucide-react";

import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import { getCategoryIcon } from "@/lib/category-icons";
import type { UnlockPageData } from "@/types/unlock";

type UnlockSummaryCardProps = {
  data: UnlockPageData;
};

export function UnlockSummaryCard({ data }: UnlockSummaryCardProps) {
  const { category, durationDays, benefits } = data;
  const Icon = getCategoryIcon(category.icon);

  return (
    <ProfileSectionCard>
      <div className="mb-3 h-1 rounded-full bg-gradient-to-r from-[#2563EB] to-[#93C5FD]" />
      <div className="flex items-center gap-3">
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6]"
          style={{ backgroundColor: category.iconBg }}
        >
          <Icon
            className="size-6"
            style={{ color: category.iconColor }}
            aria-hidden
          />
        </span>
        <div>
          <p className="text-[10px] font-semibold tracking-wide text-[#6B7280] uppercase">
            Service Category
          </p>
          <p className="text-base font-semibold text-[#111827]">
            {category.name}
          </p>
        </div>
      </div>

      <div className="my-3 border-t border-[#E5E7EB]" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
          <Calendar className="size-4 shrink-0" aria-hidden />
          <span>Unlock Duration</span>
        </div>
        <span className="text-sm font-semibold text-[#111827]">
          {durationDays} Days
        </span>
      </div>

      <p className="mt-3 text-sm leading-5 text-[#6B7280]">
        Unlock trusted access to all remaining worker contact numbers in{" "}
        <span className="font-medium text-[#111827]">{category.name}</span>{" "}
        for {durationDays} days. No booking. Call workers directly.
      </p>

      <ul className="mt-3 flex flex-col gap-2">
        {benefits.map((benefit) => (
          <li
            key={benefit}
            className="flex items-start gap-2 text-sm leading-5 text-[#374151]"
          >
            <span
              className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2563EB]"
              aria-hidden
            />
            {benefit}
          </li>
        ))}
      </ul>
    </ProfileSectionCard>
  );
}
