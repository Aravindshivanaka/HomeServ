import { Heart } from "lucide-react";
import Link from "next/link";

import { layout } from "@/lib/layout";

export function EmptyWishlistState() {
  return (
    <section
      className={`flex flex-col items-center ${layout.roundedCard} border border-[#E5E7EB] bg-white px-4 py-8 text-center ${layout.cardShadow}`}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-[#F3F4F6]">
        <Heart className="size-6 text-[#9CA3AF]" aria-hidden />
      </div>
      <h2 className="mt-3 text-base font-semibold leading-5 text-[#111827]">
        Your Wishlist is Empty
      </h2>
      <p className="mt-1.5 max-w-[240px] text-sm leading-5 text-[#6B7280]">
        Save your trusted workers by tapping the heart icon on their profile.
      </p>
      <Link
        href="/categories"
        className={`mt-4 inline-flex ${layout.touchBtn} items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-6 text-sm font-semibold text-white active:bg-[#1D4ED8]`}
      >
        Browse Categories
      </Link>
    </section>
  );
}
