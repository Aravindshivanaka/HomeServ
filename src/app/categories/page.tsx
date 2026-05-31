import type { Metadata } from "next";
import { CategoryBrowseCard } from "@/components/cards/category-browse-card";
import { MobileShell } from "@/components/layout/mobile-shell";
import { fetchCategories } from "@/lib/categories";
import { layout } from "@/lib/layout";

export const metadata: Metadata = {
  title: "All Service Categories — ServeHome",
  description: "Browse verified local service categories near you. Find plumbers, electricians, carpenters, AC repair, painters, masons, and rental services in Jagtial.",
};

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <MobileShell>
      <div className={`flex flex-col ${layout.pageX} py-3`}>
        <header className="mb-3">
          <h1 className="text-[22px] font-semibold leading-7 text-[#111827]">
            All Categories
          </h1>
          <p className="mt-1 text-sm leading-5 text-[#6B7280]">
            Browse trusted local workers by service
          </p>
        </header>
        <main className="flex flex-col gap-2.5 pb-2">
          {categories.map((category) => (
            <CategoryBrowseCard key={category.slug} category={category} />
          ))}
        </main>
      </div>
    </MobileShell>
  );
}
