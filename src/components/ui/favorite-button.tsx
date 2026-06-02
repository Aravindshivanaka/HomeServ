"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";
import { isLoggedIn, saveRedirectUrl } from "@/lib/auth";

type FavoriteButtonProps = {
  workerId: string;
  className?: string;
};

export function FavoriteButton({ workerId, className }: FavoriteButtonProps) {
  const { toggleWishlist, isFavorited } = useWishlist();
  const router = useRouter();
  const isFavorite = isFavorited(workerId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isLoggedIn()) {
          saveRedirectUrl(window.location.pathname);
          router.push("/login");
          return;
        }

        toggleWishlist(workerId);
      }}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_2px_8px_rgba(17,24,39,0.08)] border border-[#E5E7EB] active:scale-95 transition-transform",
        className
      )}
      aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={cn(
          "size-4 transition-colors",
          isFavorite ? "fill-[#EF4444] text-[#EF4444]" : "text-[#9CA3AF]"
        )}
        aria-hidden
      />
    </button>
  );
}
