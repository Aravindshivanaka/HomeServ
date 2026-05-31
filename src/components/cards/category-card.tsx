import Link from "next/link";

import { getCategoryIcon } from "@/lib/category-icons";
import { layout } from "@/lib/layout";
import type { Category } from "@/types";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = getCategoryIcon(category.icon);

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`flex min-h-[88px] flex-col items-center justify-center gap-1.5 ${layout.roundedCard} bg-white px-2 py-3 ${layout.cardShadow} active:bg-[#F8FAFC]`}
    >
      <div
        className="flex size-12 items-center justify-center rounded-full"
        style={{ backgroundColor: category.iconBg }}
      >
        <Icon
          className="size-5"
          style={{ color: category.iconColor }}
          aria-hidden
        />
      </div>
      <span className="text-center text-[13px] font-semibold leading-4 text-[#111827]">
        {category.name}
      </span>
    </Link>
  );
}
