import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AboutSection } from "@/components/profile/about-section";
import { ContactSection } from "@/components/profile/contact-section";
import { GallerySection } from "@/components/profile/gallery-section";
import { ProfileHeroCard } from "@/components/profile/profile-hero-card";
import { ProfilePageHeader } from "@/components/profile/profile-page-header";
import { ReviewsSection } from "@/components/profile/reviews-section";
import { ServicesSection } from "@/components/profile/services-section";
import { MobileShell } from "@/components/layout/mobile-shell";
import { fetchWorkerProfile } from "@/lib/workers";
import { layout } from "@/lib/layout";
import { supabase } from "@/lib/supabase";

type WorkerProfilePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: WorkerProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = await fetchWorkerProfile(id);
  if (!profile) return {};
  const { worker } = profile;
  return {
    title: `${worker.name} (${worker.categoryDisplay}) in Jagtial — ServeHome`,
    description: `Call ${worker.name}, a verified ${worker.categoryDisplay.toLowerCase()} in ${worker.area}. With ${worker.yearsExperience} years of experience and a rating of ${worker.rating}.`,
  };
}

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from("workers").select("id");
    return (data || []).map((w) => ({ id: w.id }));
  } catch {
    return [];
  }
}

export const dynamic = "force-dynamic";

export default async function WorkerProfilePage({
  params,
}: WorkerProfilePageProps) {
  const { id } = await params;
  const profile = await fetchWorkerProfile(id);

  if (!profile) {
    notFound();
  }

  const { worker, details, reviews } = profile;

  return (
    <MobileShell>
      <div className={`flex flex-col ${layout.pageX}`}>
        <ProfilePageHeader categorySlug={worker.categorySlug} />
        <main
          className={`flex flex-col ${layout.sectionGap} py-3 pb-4`}
        >
          <ProfileHeroCard worker={worker} />
          <ContactSection worker={worker} details={details} />
          <AboutSection about={details.about} />
          <ServicesSection services={details.services} />
          <GallerySection
            images={details.gallery}
            moreCount={details.galleryMoreCount}
          />
          <ReviewsSection worker={worker} reviews={reviews} />
        </main>
      </div>
    </MobileShell>
  );
}
