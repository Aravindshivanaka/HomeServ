import { LayoutGrid } from "lucide-react";
import Link from "next/link";

import { layout } from "@/lib/layout";

export function ViewAllCategoryCard() {
  return (
    <Link
      href="/categories"
      className={`flex min-h-[88px] flex-col items-center justify-center gap-1.5 ${layout.roundedCard} border border-dashed border-[#BFDBFE] bg-[#F8FAFC] px-2 py-3 active:bg-[#EFF6FF]`}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-[#EFF6FF]">
        <LayoutGrid className="size-5 text-[#2563EB]" aria-hidden />
      </div>
      <span className="text-center text-[13px] font-semibold leading-4 text-[#2563EB]">
        View All
      </span>
    </Link>
  );
}
