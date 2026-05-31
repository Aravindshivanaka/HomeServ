import { notFound } from "next/navigation";

import { CategoryPageHeader } from "@/components/category/category-page-header";
import { FreeUnlockCounter } from "@/components/category/free-unlock-counter";
import { MobileShell } from "@/components/layout/mobile-shell";
import { WorkerList } from "@/components/workers/worker-list";
import {
  getCategoryListingBySlug,
  getCategorySlugs,
} from "@/lib/categories";
import { layout } from "@/lib/layout";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const listing = getCategoryListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  return (
    <MobileShell>
      <div className={`flex flex-col ${layout.pageX}`}>
        <CategoryPageHeader
          title={listing.titlePlural}
          workerCount={listing.workerCount}
        />
        <main className={`flex flex-col ${layout.sectionGap} py-3`}>
          <FreeUnlockCounter remaining={listing.freeUnlocksRemaining} />
          <WorkerList workers={listing.workers} />
        </main>
      </div>
    </MobileShell>
  );
}
