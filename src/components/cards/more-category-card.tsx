"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

import { layout } from "@/lib/layout";
import { cn } from "@/lib/utils";

type MoreCategoryCardProps = {
  expanded: boolean;
  onToggle: () => void;
};

export function MoreCategoryCard({ expanded, onToggle }: MoreCategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={expanded ? "Show fewer categories" : "Show more categories"}
      className={cn(
        `flex min-h-[88px] w-full flex-col items-center justify-center gap-1.5 ${layout.roundedCard} bg-white px-2 py-3 ${layout.cardShadow} active:bg-[#F8FAFC]`
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-[#F3F4F6]">
        {expanded ? (
          <ChevronUp className="size-5 text-[#6B7280]" aria-hidden />
        ) : (
          <ChevronDown className="size-5 text-[#6B7280]" aria-hidden />
        )}
      </div>
      <span className="text-center text-[13px] font-semibold leading-4 text-[#111827]">
        More
      </span>
    </button>
  );
}
