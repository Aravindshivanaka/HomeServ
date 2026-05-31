import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryPageHeader } from "@/components/category/category-page-header";
import { FreeUnlockCounter } from "@/components/category/free-unlock-counter";
import { MobileShell } from "@/components/layout/mobile-shell";
import { WorkerList } from "@/components/workers/worker-list";
import { getCategorySlugs, fetchCategoryBySlug } from "@/lib/categories";
import { fetchWorkersByCategory } from "@/lib/workers";
import { layout } from "@/lib/layout";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `Verified ${category.titlePlural} in Jagtial — ServeHome`,
    description: `Find trusted, verified ${category.titlePlural.toLowerCase()} near you in Jagtial. View ratings, experience, and call workers directly.`,
  };
}

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const workers = await fetchWorkersByCategory(category.slug);

  return (
    <MobileShell>
      <div className={`flex flex-col ${layout.pageX}`}>
        <CategoryPageHeader
          title={category.titlePlural}
          workerCount={workers.length}
        />
        <main className={`flex flex-col ${layout.sectionGap} py-3`}>
          <FreeUnlockCounter remaining={2} />
          <WorkerList workers={workers} />
        </main>
      </div>
    </MobileShell>
  );
}
