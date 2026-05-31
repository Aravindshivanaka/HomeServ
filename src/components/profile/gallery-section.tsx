import Image from "next/image";

import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import type { WorkerGalleryImage } from "@/types";

type GallerySectionProps = {
  images: WorkerGalleryImage[];
  moreCount: number;
};

export function GallerySection({ images, moreCount }: GallerySectionProps) {
  return (
    <ProfileSectionCard
      title="Gallery"
      headerRight={
        <span className="text-sm font-medium text-[#2563EB]">View all</span>
      }
    >
      <div className="grid grid-cols-3 gap-2">
        {images.map((image, index) => {
          const isLast = index === images.length - 1 && moreCount > 0;
          return (
            <div
              key={image.id}
              className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#F3F4F6]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 448px) 30vw"
              />
              {isLast ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[#111827]/45 text-sm font-semibold text-white">
                  +{moreCount}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </ProfileSectionCard>
  );
}
