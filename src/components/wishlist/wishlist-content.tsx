"use client";

import { useWishlist } from "@/lib/wishlist-context";
import { getWorkerById } from "@/data/workers";
import { UnlockedWorkerContactCard } from "@/components/unlock/unlocked-worker-contact-card";
import { EmptyWishlistState } from "@/components/wishlist/empty-wishlist-state";
import { layout } from "@/lib/layout";
import { useEffect, useState } from "react";

export function WishlistContent() {
  const { wishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch since wishlist comes from localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a lightweight skeleton
  }

  if (wishlist.length === 0) {
    return <EmptyWishlistState />;
  }

  // Get full worker objects for the favorited IDs
  const favoritedWorkers = wishlist
    .map((id) => getWorkerById(id))
    .filter((w): w is NonNullable<typeof w> => w !== undefined);

  return (
    <div className={`flex flex-col ${layout.sectionGap}`}>
      <ul className="flex flex-col gap-2.5">
        {favoritedWorkers.map((worker) => (
          <li key={worker.id}>
            <UnlockedWorkerContactCard worker={worker} />
          </li>
        ))}
      </ul>
    </div>
  );
}
