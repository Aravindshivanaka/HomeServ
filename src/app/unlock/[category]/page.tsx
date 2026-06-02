"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PriceSection } from "@/components/unlock/price-section";
import { TrustSection } from "@/components/unlock/trust-section";
import { UnlockFlow } from "@/components/unlock/unlock-flow";
import { UnlockHero } from "@/components/unlock/unlock-hero";
import { UnlockPageHeader } from "@/components/unlock/unlock-page-header";
import { UnlockSummaryCard } from "@/components/unlock/unlock-summary-card";
import { getUnlockPageData } from "@/data/unlock";
import { layout } from "@/lib/layout";
import { isLoggedIn, getUserPhone, saveRedirectUrl } from "@/lib/auth";

export default function UnlockPage() {
  const router = useRouter();
  const params = useParams();
  const category = params.category as string;
  const [checking, setChecking] = useState(true);
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
      saveRedirectUrl(`/unlock/${category}`);
      router.push("/login");
      return;
    }
    setPhone(getUserPhone());
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const data = getUnlockPageData(category);
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-gray-500">Category not found</p>
      </div>
    );
  }

  return (
    <MobileShell>
      <div className={`flex flex-col ${layout.pageX}`}>
        <UnlockPageHeader categorySlug={data.category.slug} />
        <main className={`flex flex-col ${layout.sectionGap} py-3 pb-4`}>
          <UnlockHero />
          <UnlockSummaryCard data={data} />
          <PriceSection feeInr={data.feeInr} categoryName={data.category.name} />
          <UnlockFlow categoryName={data.category.name} />
          <TrustSection points={data.trustPoints} />
        </main>
      </div>
    </MobileShell>
  );
}
