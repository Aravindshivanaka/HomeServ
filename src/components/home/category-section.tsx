"use client";

import { CategoryCard } from "@/components/cards/category-card";
import { MoreCategoryCard } from "@/components/cards/more-category-card";
import { ViewAllCategoryCard } from "@/components/cards/view-all-category-card";
import { SectionHeader } from "@/components/ui/section-header";
import {
  getHomeExpandedCategories,
  getHomePrimaryCategories,
} from "@/data/categories";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Category } from "@/types";

type CategorySectionProps = {
  primaryCategories?: Category[];
  expandedCategories?: Category[];
};

export function CategorySection({
  primaryCategories,
  expandedCategories,
}: CategorySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const primary = primaryCategories ?? getHomePrimaryCategories();
  const extra = expandedCategories ?? getHomeExpandedCategories();

  return (
    <section aria-labelledby="categories-heading">
      <SectionHeader
        id="categories-heading"
        title="Categories"
        viewAllHref="/categories"
      />
      <div className="grid grid-cols-3 gap-2.5">
        {primary.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
        <MoreCategoryCard
          expanded={expanded}
          onToggle={() => setExpanded((open) => !open)}
        />
      </div>

      <div
        className={cn(
          "category-expand grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
          expanded
            ? "mt-2.5 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
        aria-hidden={!expanded}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-3 gap-2.5 pb-0.5">
            {extra.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
            <ViewAllCategoryCard />
          </div>
        </div>
      </div>
    </section>
  );
}
