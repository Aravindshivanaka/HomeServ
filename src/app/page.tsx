import { CategorySection } from "@/components/home/category-section";
import { GreetingHeader } from "@/components/home/greeting-header";
import { PromoBanner } from "@/components/home/promo-banner";
import { SearchBar } from "@/components/home/search-bar";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PopularWorkersSection } from "@/components/workers/popular-workers-section";
import { layout } from "@/lib/layout";

export default function HomePage() {
  return (
    <MobileShell>
      <main
        className={`flex flex-col ${layout.sectionGap} ${layout.pageX} pt-3`}
      >
        <GreetingHeader />
        <SearchBar />
        <PromoBanner />
        <CategorySection />
        <PopularWorkersSection />
      </main>
    </MobileShell>
  );
}
