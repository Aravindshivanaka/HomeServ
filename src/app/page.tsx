import { CategorySection } from "@/components/home/category-section";
import { GreetingHeader } from "@/components/home/greeting-header";
import { PromoBanner } from "@/components/home/promo-banner";
import { SearchBar } from "@/components/home/search-bar";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PopularWorkersSection } from "@/components/workers/popular-workers-section";
import { fetchCategories } from "@/lib/categories";
import { fetchPopularWorkers } from "@/lib/workers";
import { layout } from "@/lib/layout";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const categories = await fetchCategories();
  const popularWorkers = await fetchPopularWorkers();

  // Derive primary vs. extra categories locally based on the default launch scope slugs
  const primarySlugs = ["plumber", "electrician", "carpenter", "ac-repair", "auto-rental"];
  const primary = categories.filter((c) => primarySlugs.includes(c.slug));
  const extra = categories.filter((c) => !primarySlugs.includes(c.slug));

  return (
    <MobileShell>
      <main
        className={`flex flex-col ${layout.sectionGap} ${layout.pageX} pt-3`}
      >
        <GreetingHeader />
        <SearchBar initialCategories={categories} />
        <PromoBanner />
        <CategorySection primaryCategories={primary} expandedCategories={extra} />
        <PopularWorkersSection initialWorkers={popularWorkers} />
      </main>
    </MobileShell>
  );
}
