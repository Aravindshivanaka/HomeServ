import Link from "next/link";

import { getCategoryIcon } from "@/lib/category-icons";
import { layout } from "@/lib/layout";
import type { Category } from "@/types";

type CategoryBrowseCardProps = {
  category: Category;
};

export function CategoryBrowseCard({ category }: CategoryBrowseCardProps) {
  const Icon = getCategoryIcon(category.icon);

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`flex min-h-[72px] items-center gap-3 ${layout.roundedCard} border border-[#E5E7EB] bg-white px-3.5 py-3 ${layout.cardShadow} active:bg-[#F8FAFC]`}
    >
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: category.iconBg }}
      >
        <Icon
          className="size-5"
          style={{ color: category.iconColor }}
          aria-hidden
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold leading-5 text-[#111827]">
          {category.name}
        </p>
        <p className="mt-0.5 text-sm text-[#6B7280]">
          {category.workerCount} workers available
        </p>
      </div>
    </Link>
  );
}
