import { Star } from "lucide-react";

import { ReviewCard } from "@/components/profile/review-card";
import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import type { Review } from "@/types";
import type { Worker } from "@/types";

type ReviewsSectionProps = {
  worker: Worker;
  reviews: Review[];
};

export function ReviewsSection({ worker, reviews }: ReviewsSectionProps) {
  return (
    <ProfileSectionCard
      title="Customer Reviews"
      headerRight={
        <span className="flex items-center gap-1 text-sm font-semibold text-[#111827]">
          {worker.rating}
          <Star
            className="size-3.5 fill-[#FACC15] text-[#FACC15]"
            aria-hidden
          />
        </span>
      }
    >
      <p className="mb-2.5 text-xs text-[#6B7280]">
        Showing {reviews.length} of {worker.reviewCount}
      </p>
      <div className="flex flex-col gap-2.5">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <button
        type="button"
        className="mt-3 w-full rounded-xl border border-[#BFDBFE] bg-white py-3 text-sm font-semibold text-[#2563EB] active:bg-[#EFF6FF]"
      >
        View all {worker.reviewCount} reviews
      </button>
    </ProfileSectionCard>
  );
}
