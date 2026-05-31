import { Star } from "lucide-react";

import type { Review } from "@/types";

type ReviewCardProps = {
  review: Review;
};

const STARS = [0, 1, 2, 3, 4];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {STARS.map((i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < rating
              ? "fill-[#FACC15] text-[#FACC15]"
              : "fill-[#E5E7EB] text-[#E5E7EB]"
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initial = review.authorName.charAt(0).toUpperCase();

  return (
    <article className="rounded-xl bg-[#F9FAFB] p-3">
      <div className="flex items-center gap-2.5">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-sm font-semibold text-[#6B7280]"
          aria-hidden
        >
          {initial}
        </span>
        <div>
          <p className="text-sm font-semibold text-[#111827]">
            {review.authorName}
          </p>
          <StarRow rating={review.rating} />
        </div>
      </div>
      <p className="mt-2 text-sm leading-5 text-[#6B7280]">{review.comment}</p>
    </article>
  );
}
