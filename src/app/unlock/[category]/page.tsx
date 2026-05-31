import { notFound } from "next/navigation";

import { MobileShell } from "@/components/layout/mobile-shell";
import { PriceSection } from "@/components/unlock/price-section";
import { TrustSection } from "@/components/unlock/trust-section";
import { UnlockFlow } from "@/components/unlock/unlock-flow";
import { UnlockHero } from "@/components/unlock/unlock-hero";
import { UnlockPageHeader } from "@/components/unlock/unlock-page-header";
import { UnlockSummaryCard } from "@/components/unlock/unlock-summary-card";
import { getAllCategorySlugs } from "@/data/categories";
import { getUnlockPageData } from "@/data/unlock";
import { layout } from "@/lib/layout";

type UnlockPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export default async function UnlockPage({ params }: UnlockPageProps) {
  const { category: categorySlug } = await params;
  const data = getUnlockPageData(categorySlug);

  if (!data) {
    notFound();
  }

  return (
    <MobileShell>
      <div className={`flex flex-col ${layout.pageX}`}>
        <UnlockPageHeader categorySlug={data.category.slug} />
        <main className={`flex flex-col ${layout.sectionGap} py-3 pb-4`}>
          <UnlockHero />
          <UnlockSummaryCard data={data} />
          <PriceSection
            feeInr={data.feeInr}
            categoryName={data.category.name}
          />
          <UnlockFlow categoryName={data.category.name} />
          <TrustSection points={data.trustPoints} />
        </main>
      </div>
    </MobileShell>
  );
}
